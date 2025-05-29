import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Deployment](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-deployment)
 * Information about the latest deployment of each app in a pipeline. A deployment is the process of moving the build artifacts to a target environment.
 */
export default class PipelineDeploymentService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * List latest deployments for each app in a pipeline. A deployment is a release that changed your source slug, container image, or Heroku processes.
   *
   * @param pipelineId unique identifier of pipeline
   * @example "01234567-89ab-cdef-0123-456789abcdef".
   * @param requestInit The initializer for the request.
   */
  public async list(
    pipelineId: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Release[]> {
    const response = await this.fetchImpl(`${this.endpoint}/pipelines/${pipelineId}/latest-deployments`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Release[]>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
}
