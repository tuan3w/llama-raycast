enum Filter {
  All = "all",
  Open = "open",
  Completed = "completed",
}

interface AICommand {
  id: string;
  icon?: string;
  title: string;
  instruction: string;
}

export { Filter };
export type { AICommand };

type State = {
  isLoading: boolean;
  searchText: string;
  commands: AICommand[];
};

export { type State };
