import React, { useCallback } from "react";
import { CreateCommandForm } from "./components";
import useStoreState from "./hooks/useStoreState";

export default function Command() {
  const { state, createCommand } = useStoreState();
  const handleCreate = useCallback(
    (title: string, instruction: string) => {
      createCommand(title, instruction);
    },
    [state.commands]
  );

  return <CreateCommandForm onCreate={handleCreate} />;
}
