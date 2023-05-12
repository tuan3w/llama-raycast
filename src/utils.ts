import { createParser } from "eventsource-parser";
import fetch, { RequestInit } from "node-fetch";

// Ref: https://github.com/douo/raycast-openai-translator/blob/main/src/providers/openai/utils.ts

interface FetchSSEOptions extends RequestInit {
  onMessage(data: string): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError(error: any): void;
  onResponse?(): void;
  onDone?(): void;
}

export async function fetchSSE(input: string, options: FetchSSEOptions) {
  const { onMessage, onError, onResponse, onDone, ...fetchOptions } = options;
  try {
    const resp = await fetch(input, fetchOptions);
    onResponse?.();

    if (resp.status !== 200) {
      onError(await resp.json());
      onDone?.();
      return;
    }
    const parser = createParser((event) => {
      if (event.type === "event") {
        onMessage(event.data);
      }
    });
    if (resp.body) {
      for await (const chunk of resp.body) {
        if (chunk) {
          const str = new TextDecoder().decode(chunk as ArrayBuffer);
          parser.feed(str);
        }
      }
    }
    onDone?.();
  } catch (error) {
    onError(error);
    onDone?.();
  }
}
process.on("uncaughtException", (e) => {
  console.log("Got unexpected exception", e);
});
