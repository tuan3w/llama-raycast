import { Command } from "commander";
import { App, AppConfig } from "./server.js";


const run = async (config: AppConfig) => {
  const app = new App(config);
  await app.init();
  app.start();
};

const program = new Command();
program
  .name("llama-server")
  .argument("<model>", "path to lamma.cpp model")
  .option("-t --threads", "number of threads to use during computation", "4")
  .option("-c --ctx_size", "size of the prompt context", "2048")
  .option("--top_k", "top-k sampling (default: 40, 0 = disabled)", "40")
  .option("--top_p", "top-p sampling (default: 0.9, 1.0 = disabled)", "0.9")
  .option("--temp", "temperature (default: 0.3)", "0.3")
  .option("--repeat_penalty", "penalize repeat sequence of tokens (default: 1.1, 1.0 = disabled)", "1.0")
  .action(async (model: string) => {
    console.log(`Loading model from ${model} ... \n`);
    const options = program.opts();

    const config: AppConfig = {
      path: model,
      enableLogging: false,
      nCtx: 1024,
      nParts: -1,
      seed: 0,
      f16Kv: false,
      logitsAll: false,
      vocabOnly: false,
      useMlock: false,
      embedding: false,
      useMmap: true,

      // other options
      numThreads: parseInt(options.threads),
      topK: parseInt(options.top_k),
      topP: parseFloat(options.top_p),
      temperature: parseFloat(options.temp),
      contextSize: parseInt(options.ctx_size),
      repeatPenalty: parseFloat(options.repeat_penalty)
    };
    await run(config);
  })
  .parse();