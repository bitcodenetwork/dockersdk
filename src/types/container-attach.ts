/**
 * Docker Container Attach Query
 */

export type DockerContainerAttachQuery = {
  detachKeys?: string;
  logs?: boolean;
  stream?: boolean;
  stdin?: boolean;
  stdout?: boolean;
  stderr?: boolean;
}