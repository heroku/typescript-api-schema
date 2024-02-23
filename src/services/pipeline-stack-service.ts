import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Stack](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-stack)
 * A pipeline's stack is determined by the apps in the pipeline. This is used during creation of CI and Review Apps that have no stack defined in app.json
 */
export default class PipelineStackService {
  public constructor(protected readonly fetchImpl: typeof fetch) {}

  /**
   * The stack for a given pipeline, used for CI and Review Apps that have no stack defined in app.json.
   *
   * @param pipelineId unique identifier of pipeline
   * @example "01234567-89ab-cdef-0123-456789abcdef".
   * @param requestInit The initializer for the request.
   */
  public async defaultStack(
    pipelineId: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.PipelineStack> {
    const response = await this.fetchImpl(`/pipelines/${pipelineId}/pipeline-stack`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PipelineStack>;
    }
    throw new Error(response.statusText);
  }
}
