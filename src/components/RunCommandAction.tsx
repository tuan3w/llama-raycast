import React from "react";
import { Action, Icon } from "@raycast/api";
import { AICommand } from "../types";
import RunCommandForm from "./RunCommandForm";

function RunCommandAction(props: { command: AICommand }) {
  return (
    <Action.Push
      icon={Icon.Play}
      title="Run Command"
      target={<RunCommandForm command={props.command} />}
    />
  );
}

export default RunCommandAction;
