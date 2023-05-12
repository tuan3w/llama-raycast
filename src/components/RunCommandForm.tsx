import {
  Action,
  ActionPanel,
  Form,
  Toast,
  showToast
} from "@raycast/api";
import React, { useRef, useState } from "react";
import useAIAnswer from "../hooks/useAIAnswer";
import { AICommand } from "../types";

function RunCommandForm(props: { command: AICommand }) {
  const { command } = props;
  const [question, setQuestion] = useState<string>("");
  const ref = useRef<Form.TextField>(null);
  const { answer, loadingState } = useAIAnswer(question);

  const handleSubmit = (values: { input: string }) => {
    if (loadingState == "loading") {
      showToast({
        title: "Please wait until the response is complete!",
        style: Toast.Style.Failure,
      });
      return;
    }

    const instruction = `${command.instruction}
\`\`\`
${values.input}
\`\`\`
`;
    setQuestion(instruction);
  };

  return (
    <Form
      navigationTitle={`LLaMa cmd: ${command.title}`}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Ask" onSubmit={handleSubmit} />
          <Action.CopyToClipboard
            title="Copy Answer"
            content={answer || ""}
            shortcut={{ modifiers: ["cmd"], key: "." }}
          />
        </ActionPanel>
      }
    >
      <Form.TextArea
        title=""
        ref={ref}
        id="input"
        placeholder="Enter your text here"
      />
      {answer != "" && <Form.Description title="Answer" text={answer || ""} />}
    </Form>
  );
}

export default RunCommandForm;
