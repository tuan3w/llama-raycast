import React from "react";
import { Action, Icon } from "@raycast/api";
import { AICommand } from "../types";
import CreateCommandForm from "./CreateCommandForm";

function CreateCommandAction(props: {
  defaultTitle?: string;
  onCreate: (title: string, instruction: string) => void;
}) {
  return (
    <Action.Push
      icon={Icon.Plus}
      title="Create Command"
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      target={
        <CreateCommandForm
          defaultTitle={props.defaultTitle}
          onCreate={props.onCreate}
        />
      }
    />
  );
}

export default CreateCommandAction;
