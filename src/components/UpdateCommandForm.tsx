import React, { useCallback } from "react";
import { Form, Action, ActionPanel, useNavigation } from "@raycast/api";
import { AICommand } from "../types";

function UpdateCommandForm(props: {
  command: AICommand;
  onUpdate: (id: string, title: string, instruction: string) => void;
}) {
  const { onUpdate, command } = props;
  const { pop } = useNavigation();

  const handleSubmit = useCallback(
    (values: { title: string; instruction: string }) => {
      onUpdate(command.id, values.title, values.instruction);
      pop();
    },
    [onUpdate, pop]
  );

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Update AI Command"
            onSubmit={handleSubmit}
          />
        </ActionPanel>
      }
    >
      <Form.TextField id="title" defaultValue={command.title} title="Title" />
      <Form.TextArea
        id="instruction"
        defaultValue={command.instruction}
        title="Instruction"
      />
    </Form>
  );
}

export default UpdateCommandForm;
