interface AICommand {
  id: string;
  icon?: string;
  title: string;
  instruction: string;
}

type State = {
  isLoading: boolean;
  searchText: string;
  commands: AICommand[];
};

export { type State };
