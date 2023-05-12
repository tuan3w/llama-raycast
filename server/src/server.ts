import type { LlamaInvocation } from "@llama-node/llama-cpp";
import bodyParser from "body-parser";
import express, { Express, Request, Response } from 'express';
import { LLM } from "llama-node";
import { LLamaCpp, type LoadConfig } from "llama-node/dist/llm/llama-cpp.js";
import morgan from 'morgan';


const PROMPT_TEMPLATE = `Below is an instruction that describes a task. Write a response that appropriately completes the request.

`;

export type AppConfig = LoadConfig & {
    numThreads: number;
    contextSize: number;
    temperature: number;
    topK: number;
    topP: number;
    repeatPenalty: number;
}

export class App {
    llama: LLM;
    server: Express;
    constructor(readonly config: AppConfig) {
        this.llama = new LLM(LLamaCpp);
        this.server = express();
    }
    async init() {
        await this.llama.load(this.config);

        this.server.use(bodyParser.json());
        this.server.use(morgan("short"));

        this.server.post("/chat/completions", (req: Request, resp: Response) => {
            const question = req.body.question;
            if (!question) {
                resp.status(400).json({ "message": "'question' is required!" })
                return
            }
            const maxCharacters = req.body.max_characters || 1024;

            const prompt = PROMPT_TEMPLATE + question + '\n';

            const params: LlamaInvocation = {
                nThreads: this.config.numThreads,
                nTokPredict: maxCharacters,
                topK: this.config.topK,
                topP: this.config.topP,
                temp: this.config.temperature,
                repeatPenalty: this.config.repeatPenalty,
                prompt,
            };
            console.log("Question: ", question);

            resp.setHeader('Cache-Control', 'no-cache');
            resp.setHeader('Content-Type', 'text/event-stream');
            resp.setHeader('Access-Control-Allow-Origin', '*');
            resp.setHeader('Connection', 'keep-alive');
            resp.flushHeaders(); // flush the headers to establish SSE with client

            const startTime = performance.now();

            this.llama.createCompletion(params, (response) => {
                if (response.completed) {
                    resp.end()
                    console.log("Generated complete response in ", performance.now() - startTime, "ms !")
                } else {
                    resp.write(`data: ${response.token}\n\n`);
                }
            })
        });

        this.server.use((err: any, req: any, res: { headersSent: any; status: (arg0: number) => void; render: (arg0: string, arg1: { error: any; }) => void; }, next: (arg0: any) => void) => {
            if (res.headersSent) {
                return next(err)
            }
            res.status(500)
            res.render('error', { error: err })
        });
    }
    start() {
        this.server.listen(8000, () => {
            console.log("\n\nServer started!!!");
        })
    }
}