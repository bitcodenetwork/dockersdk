export interface GetTaskLogsQuery {
  details?: boolean;
  follow?: boolean;
  stdout?: boolean;
  stderr?: boolean;
  since?: number;
  timestamps?: boolean;
  tail?: string;
}