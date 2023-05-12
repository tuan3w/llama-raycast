import useCommands from "./useCommands";

export default function useCommand(id: string) {
  const commands = useCommands();
  return commands.find((c) => c.id == id);
}
