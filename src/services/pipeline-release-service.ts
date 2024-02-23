import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Release](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-release)
 * Information about latest releases of apps in a pipeline.
 */
export default class PipelineReleaseService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * List latest releases for each app in a pipeline
   *
   * @param pipelineId unique identifier of pipeline
   * @example 01234567-89ab-cdef-0123-456789abcdef.
   */
  public async list(pipelineId: string): Promise<Heroku.Release[]> {
    const response = await this.heroku.get<Heroku.Release[]>(`/pipelines/${pipelineId}/latest-releases`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
