import React, { useState, useEffect } from "react";
import { LocalStorage } from "@raycast/api";

import { State, AICommand } from "../types";
import { nanoid } from "nanoid";

const STORAGE_KEY = "_llama_ai";

export default function useStoreState() {
  const [state, setState] = useState<State>({
    isLoading: true,
    searchText: "",
    commands: [],
  });

  useEffect(() => {
    (async () => {
      const storedAICommands = await LocalStorage.getItem<string>(STORAGE_KEY);

      if (!storedAICommands) {
        setState((previous) => ({ ...previous, isLoading: false }));
        return;
      }

      try {
        const commands: AICommand[] = JSON.parse(storedAICommands);
        setState((previous) => ({
          ...previous,
          commands: commands,
          isLoading: false,
        }));
      } catch (e) {
        // can't decode commands
        setState((previous) => ({
          ...previous,
          commands: [],
          isLoading: false,
        }));
      }
    })();

  }, []);

  useEffect(() => {
    LocalStorage.setItem(STORAGE_KEY, JSON.stringify(state.commands));
  }, [state.commands]);

  const createCommand = (title: string, instruction: string) => {
    const commands = [...state.commands, { id: nanoid(), title, instruction }];
    setState((prevState) => ({ ...prevState, commands }));
  };

  const deleteCommand = (id: string) => {
    const commands = state.commands.filter((c) => c.id != id);
    setState((prevState) => ({ ...prevState, commands }));
  };
  const updateCommand = (id: string, title: string, instruction: string) => {
    const commands = state.commands.map((c) => {
      if (c.id == id) return { id, title, instruction };
      else return c;
    });
    setState((prevState) => ({ ...prevState, commands }));
  };

  const setSearchText = (text: string) => {
    setState((prevState) => ({ ...prevState, searchText: text }));
  };

  return { state, createCommand, updateCommand, deleteCommand, setSearchText };
}
