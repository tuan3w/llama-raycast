import React, { useCallback } from "react";
import { Form, Action, ActionPanel, useNavigation } from "@raycast/api";

function CreateCommandForm(props: {
  defaultTitle?: string;
  onCreate: (title: string, instruction: string) => void;
}) {
  const { onCreate, defaultTitle = "" } = props;
  const { pop } = useNavigation();

  const handleSubmit = useCallback(
    (values: { title: string; instruction: string }) => {
      onCreate(values.title, values.instruction);
      pop();
    },
    [onCreate, pop]
  );

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Create AI Command"
            onSubmit={handleSubmit}
          />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="title"
        defaultValue={defaultTitle}
        title="Title"
        placeholder="Name of command"
      />
      <Form.TextArea
        id="instruction"
        defaultValue={defaultTitle}
        title="Instruction"
        placeholder="Instruction prompt about how to you want change the text"
      />
    </Form>
  );
}

export default CreateCommandForm;
