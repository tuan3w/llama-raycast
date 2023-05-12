import useStoreState from "./useStoreState";

export default function useCommands() {
  const { state } = useStoreState();
  return state.commands;
}
