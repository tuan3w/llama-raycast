import {
  Action,
  ActionPanel,
  Form,
  Icon,
  Toast,
  showToast,
} from "@raycast/api";
import React, { useRef, useState } from "react";
import useAIAnswer from "./hooks/useAIAnswer";

export default function Command() {
  const [question, setQuestion] = useState<string>();
  const { answer, loadingState } = useAIAnswer(question || "");
  const ref = useRef<Form.TextField>(null);

  return (
    <Form
      navigationTitle="LLaMA Chat"
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Ask"
            icon={Icon.Message}
            onSubmit={(values) => {
              if (loadingState == "loading") {
                showToast({
                  title: "Please wait until the response is complete!",
                  style: Toast.Style.Failure,
                });
                return;
              }
              setQuestion(values.question);
              ref.current!.reset();
            }}
          />
          <Action.CopyToClipboard
            title="Copy Answer"
            content={answer || ""}
            shortcut={{ modifiers: ["cmd"], key: "." }}
          />
        </ActionPanel>
      }
    >
      <Form.TextField
        title=""
        ref={ref}
        id="question"
        placeholder="What do you want to know?"
      />
      {question != "" && question != undefined && (
        <Form.Description title="Q:" text={question || ""} />
      )}
      {answer != "" && <Form.Description title="A:" text={answer || ""} />}
    </Form>
  );
}
