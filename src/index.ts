import os from 'os';
import { BuildImageHeader } from '../interfaces/build-image-header';
import { BuildImageQuery } from '../interfaces/build-image-query';
import { CreateContainerBody } from '../interfaces/create-container-body';
import { CreateContainerQuery } from '../interfaces/create-container-query';
import { CreateContainerResponse } from '../interfaces/create-container-response';
import { CreateImageFromContainerBody } from '../interfaces/create-image-from-container-body';
import { CreateImageFromContainerQuery } from '../interfaces/create-image-from-container-query';
import { CreateImageFromContainerResponse } from '../interfaces/create-image-from-container-response';
import { CreateImageHeader } from '../interfaces/create-image-header';
import { CreateImageQuery } from '../interfaces/create-image-query';
import { DeleteBuilderCacheQuery } from '../interfaces/delete-builder-cache-query';
import { DeleteUnusedImagesQuery } from '../interfaces/delete-unused-images-query';
import { DeleteUnusedImagesResponse } from '../interfaces/delete-unused-images-response';
import { ExportSeveralImagesQuery } from '../interfaces/export-several-images-query';
import { GetContainerQuery } from '../interfaces/get-container-query';
import { GetContainerResponse } from '../interfaces/get-container-response';
import { GetImageQuery } from '../interfaces/get-image-query';
import { GetImageResponse } from '../interfaces/get-image-response';
import { GetSwarmUnlockKeyResponse } from '../interfaces/get-swarm-unlock-key-response';
import { ImageHistoryResponse } from '../interfaces/image-history-response';
import { ImportImageQuery } from '../interfaces/import-image-query';
import { InitializeSwarmBody } from '../interfaces/initialize-swarm-body';
import { InspectImageResponse } from '../interfaces/inspect-image-response';
import { InspectSwarmResponse } from '../interfaces/inspect-swarm-response';
import { JoinSwarmBody } from '../interfaces/join-swarm-body';
import { LeaveSwarmQuery } from '../interfaces/leave-swarm-query';
import { PushImageHeader } from '../interfaces/push-image-header';
import { PushImageQuery } from '../interfaces/push-image-query';
import { RemoveContainerQuery } from '../interfaces/remove-container-query';
import { RemoveContainerResponse } from '../interfaces/remove-container-response';
import { RemoveImageQuery } from '../interfaces/remove-image-query';
import { RestartContainerQuery } from '../interfaces/restart-container-query';
import { RestartContainerResponse } from '../interfaces/restart-container-response';
import { SearchImageQuery } from '../interfaces/search-image-query';
import { SearchImageResponse } from '../interfaces/search-image-response';
import { StartContainerQuery } from '../interfaces/start-container-query';
import { StartContainerResponse } from '../interfaces/start-container-response';
import { StopContainerQuery } from '../interfaces/stop-container-query';
import { StopContainerResponse } from '../interfaces/stop-container-response';
import { TagImageQuery } from '../interfaces/tag-image-query';
import { UpdateSwarmProp } from '../interfaces/update-swarm-prop';
import { ConnectOptions, Utils } from './utils';

export class Dockersdk {
  constructor() {
    // Get the socket path from the environment
    if (process.env.DOCKER_HOST) {
      this.socketPath = process.env.DOCKER_HOST;
    }

    // If the socket path is not set,
    // use the default path for the current operating system

    // Windows: //./piped/docker_engine
    else if (os.type() === 'Windows_NT') {
      this.socketPath = '//./pipe/docker_engine';
    }

    // Linux: /var/run/docker.sock
    else {
      this.socketPath = '/var/run/docker.sock';
    }
  }

  private readonly socketPath: string;
  private readonly version: string = "v1.47";

  private createRequestOption(param: { method: "GET" | "POST" | "DELETE"; path: string; headers?: any; query?: any; body?: any; }): ConnectOptions {
    return {
      path: `/${this.version}/${param.path}`,
      method: param.method,
      socketPath: this.socketPath,
      headers: param.headers ?? {},
      query: param.query ?? {},
      body: param.body ?? {}
    }
  }

  public async getContainer(params?: { query?: GetContainerQuery }): Promise<GetContainerResponse | string> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'GET',
      path: 'containers/json',
      query: params?.query
    });

    return await Utils.connect(options);
  }

  public async createContainer(params?: { body?: CreateContainerBody, query?: CreateContainerQuery }): Promise<CreateContainerResponse> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'containers/create',
      query: params?.query,
      body: params?.body
    });

    return await Utils.connect(options);
  }

  public async startContainer(params: { id: string, query?: StartContainerQuery }): Promise<StartContainerResponse> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'containers/' + params.id + '/start',
      query: params?.query,
    });

    return await Utils.connect(options);
  }

  public async stopContainer(params: { id: string, query?: StopContainerQuery }): Promise<StopContainerResponse> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'containers/' + params.id + '/stop',
      query: params?.query,
    });

    return await Utils.connect(options);
  }

  public async restartContainer(params: { id: string, query?: RestartContainerQuery }): Promise<RestartContainerResponse> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'containers/' + params.id + '/restart',
      query: params?.query,
    });

    return await Utils.connect(options);
  }

  public async removeContainer(params: { id: string, query?: RemoveContainerQuery }): Promise<RemoveContainerResponse> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'DELETE',
      path: 'containers/' + params.id,
      query: params?.query,
    });

    return await Utils.connect(options);
  }

  // ====================
  // Docker Image Section
  // ====================

  public async getImages(params?: { query?: GetImageQuery }): Promise<GetImageResponse> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'GET',
      path: 'images/json',
      query: params?.query
    });

    return await Utils.connect(options);
  }

  public async buildImage(params: { query?: BuildImageQuery, headers?: BuildImageHeader, body: File }): Promise<string> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'build',
      headers: params?.headers,
      query: params?.query,
      body: params?.body
    });

    return await Utils.connect(options);
  }

  public async deleteBuilderCache(params: { query?: DeleteBuilderCacheQuery }): Promise<string> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'build/prune',
      query: params?.query,
    });

    return await Utils.connect(options);
  }

  public async createImage(params: { query?: CreateImageQuery, headers?: CreateImageHeader, body?: File }): Promise<string> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'image/create',
      headers: params?.headers,
      query: params?.query,
    });

    return await Utils.connect(options);
  }

  public async inspectImage(params: { name: string }): Promise<InspectImageResponse> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'images/' + params.name + '/json',
    });

    return await Utils.connect(options);
  }

  public async imageHistory(params: { name: string }): Promise<ImageHistoryResponse> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'images/' + params.name + '/history',
    });

    return await Utils.connect(options);
  }

  public async pushImage(params: { name: string; query?: PushImageQuery; headers?: PushImageHeader }): Promise<string> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'images/' + params.name + '/push',
      headers: params?.headers,
      query: params?.query,
    });

    return await Utils.connect(options);
  }

  public async tagImage(params: { name: string; query?: TagImageQuery }): Promise<string> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'images/' + params.name + '/tag',
      query: params?.query
    });

    return await Utils.connect(options);
  }

  public async removeImage(params: { name: string; query?: RemoveImageQuery }): Promise<string> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'DELETE',
      path: 'images/' + params.name,
      query: params?.query
    });

    return await Utils.connect(options);
  }

  public async searchImage(params: { query?: SearchImageQuery }): Promise<SearchImageResponse> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'DELETE',
      path: 'images/search',
      query: params?.query
    });

    return await Utils.connect(options);
  }

  public async deleteUnusedImages(params: { query?: DeleteUnusedImagesQuery }): Promise<DeleteUnusedImagesResponse> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'images/prune',
      query: params?.query
    });

    return await Utils.connect(options);
  }

  public async createImageFromContainer(params: { query?: CreateImageFromContainerQuery, body?: CreateImageFromContainerBody }): Promise<CreateImageFromContainerResponse> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'commit',
      query: params?.query,
      body: params?.body
    });

    return await Utils.connect(options);
  }

  public async exportImage(params: { name: string; }): Promise<string> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'images/' + params.name + '/get',
    });

    return await Utils.connect(options);
  }

  public async exportSeveralImages(params: { query?: ExportSeveralImagesQuery }): Promise<string> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'images/get',
      query: params?.query
    });

    return await Utils.connect(options);
  }

  public async importImage(params: { body?: ImportImageQuery }): Promise<string> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'images/load',
      body: params?.body
    });

    return await Utils.connect(options);
  }

  // ====================
  // Docker Swarm Section
  // ====================

  public async inspectSwarm(): Promise<InspectSwarmResponse> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'GET',
      path: 'swarm',
    });

    return await Utils.connect(options);
  }

  public async initializeSwarm(params?: { body?: InitializeSwarmBody }): Promise<string> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'swarm/init',
      body: params?.body
    });

    return await Utils.connect(options);
  }

  public async joinSwarm(params?: { body?: JoinSwarmBody }): Promise<string> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'swarm/join',
      body: params?.body
    });

    return await Utils.connect(options);
  }

  public async leaveSwarm(params: { query?: LeaveSwarmQuery }): Promise<string> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'swarm/leave',
      query: params?.query
    });

    return await Utils.connect(options);
  }

  public async updateSwarm(params: UpdateSwarmProp): Promise<string> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'swarm/update',
      body: params?.body
    });

    return await Utils.connect(options);
  }

  public async getSwarmUnlockKey(): Promise<GetSwarmUnlockKeyResponse> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'GET',
      path: 'swarm/unlockkey',
    });

    return await Utils.connect(options);
  }

  public async unlockSwarmManager(): Promise<GetSwarmUnlockKeyResponse> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'POST',
      path: 'swarm/unlock',
    });

    return await Utils.connect(options);
  }
}
