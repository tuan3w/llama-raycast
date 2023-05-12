import React from "react";
import { Action, Icon } from "@raycast/api";
import { AICommand } from "../types";
import UpdateCommandForm from "./UpdateCommandForm";

function UpdateCommandAction(props: {
  command: AICommand;
  onUpdate: (id: string, title: string, instruction: string) => void;
}) {
  return (
    <Action.Push
      icon={Icon.Pencil}
      title="Update Command"
      shortcut={{ modifiers: ["cmd"], key: "e" }}
      target={
        <UpdateCommandForm command={props.command} onUpdate={props.onUpdate} />
      }
    />
  );
}

export default UpdateCommandAction;
