import { ActionPanel, List } from "@raycast/api";
import React, { useCallback } from "react";
import {
  CreateCommandAction,
  DeleteCommandAction,
  EmptyView,
  RunCommandAction,
  UpdateCommandAction,
} from "./components";
import useStoreState from "./hooks/useStoreState";

export default function Command() {
  const { state, createCommand, updateCommand, setSearchText, deleteCommand } =
    useStoreState();

  const handleCreate = useCallback(
    (title: string, instruction: string) => {
      createCommand(title, instruction);
    },
    [state.commands]
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteCommand(id);
    },
    [state.commands]
  );

  const handleUpdate = useCallback(
    (id: string, title: string, instruction: string) => {
      updateCommand(id, title, instruction);
    },
    [state.commands]
  );

  return (
    <List
      isLoading={state.isLoading}
      searchText={state.searchText}
      enableFiltering
      onSearchTextChange={(newValue) => {
        setSearchText(newValue);
      }}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <CreateCommandAction onCreate={handleCreate} />
          </ActionPanel.Section>
        </ActionPanel>
      }
    >
      {state.commands.length == 0 && <EmptyView />}

      {state.commands.map((command) => (
        <List.Item
          key={command.id}
          icon={command.icon}
          title={command.title}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <RunCommandAction command={command} />
              </ActionPanel.Section>
              <ActionPanel.Section>
                <CreateCommandAction onCreate={handleCreate} />
                <UpdateCommandAction
                  command={command}
                  onUpdate={handleUpdate}
                />
                <DeleteCommandAction
                  onDelete={() => handleDelete(command.id)}
                />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
