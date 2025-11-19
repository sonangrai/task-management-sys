export type TStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "on_hold";

export type TPriority = "urgent" | "high" | "medium" | "moderate" | "low";

export type TTask = {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: TStatus;
  priority: TPriority;
  due: string;
  completedOn: Date | null;
  updated_at: Date | null;
  created_at: string;
  deleted_at: Date | null;
};

export type TResponse<T> = {
  data: T;
  status: number;
  msg: string;
  meta: any;
};
