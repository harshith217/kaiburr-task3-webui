export type Task = {
  id: string;
  name: string;
  owner: string;
  command: string;
  taskExecutions?: TaskExecution[];
};

export type TaskExecution = {
  startTime: string;
  endTime: string;
  output: string;
};
