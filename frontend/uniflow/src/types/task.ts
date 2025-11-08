export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: number;
  title: string;
  description?: string;
  deadline: Date;
  priority: TaskPriority;
  course?: string;
  completed: boolean;
  groupId?: number | null;
  groupName?: string;
}

export interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}