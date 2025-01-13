type DockerExecBody = {
  AttachStdin?: boolean;
  AttachStdout?: boolean;
  AttachStderr?: boolean;
  ConsoleSize?: number[];
  DetachKeys?: string;
  Tty?: boolean;
  Env?: string[];
  Cmd?: string[];
  Privileged?: boolean;
  User?: string;
  WorkingDir?: string;
}

type DockerExecResponse = {
  Id: string
}
