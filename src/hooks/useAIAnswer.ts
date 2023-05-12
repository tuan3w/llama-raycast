import { getPreferenceValues } from "@raycast/api";
import { useEffect, useState } from "react";
import { fetchSSE } from "../utils";

enum LoadingState {
  Idle = "idle",
  Loading = "loading",
  Done = "done",
  Error = "error",
}

type AppPreferences = {
  serverUrl: string;
  maxCharacters: string;
};

const DEFAULT_SERVER_URL = "http://localhost:8000/chat/completions";

function getServerUrl() {
  return getPreferenceValues<AppPreferences>().serverUrl || DEFAULT_SERVER_URL;
}

function getMaxCharacters() {
  return parseInt(
    getPreferenceValues<AppPreferences>().maxCharacters || "1024"
  );
}

export default function useAIAnswer(question: string) {
  const [answer, setAnswer] = useState<string>("");
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.Idle
  );

  useEffect(() => {
    if (!question) {
      setAnswer("");
      return;
    }

    setAnswer("");
    setLoadingState(LoadingState.Loading);
    console.log("Asking: ", question);
    fetchSSE(getServerUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
        max_characters: getMaxCharacters(),
      }),
      onMessage: (msg) => {
        setAnswer((t) => t + msg);
      },
      onError: (err) => {
        console.log("Got response error", err);
        setLoadingState(LoadingState.Error);
      },
      onResponse() {
        setLoadingState(LoadingState.Loading);
      },
      onDone() {
        setLoadingState(LoadingState.Done);
      },
    });
  }, [question]);

  return { answer, loadingState };
}
