import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Coupling](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-coupling)
 * Information about an app's coupling to a pipeline
 */
export default class PipelineCouplingService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * List couplings for a pipeline
   *
   * @param pipelineId unique identifier of pipeline
   * @example 01234567-89ab-cdef-0123-456789abcdef.
   */
  public async listByPipeline(pipelineId: string): Promise<Heroku.PipelineCoupling[]> {
    const response = await this.heroku.get<Heroku.PipelineCoupling[]>(`/pipelines/${pipelineId}/pipeline-couplings`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List pipeline couplings for the current user.
   *
   */
  public async listByCurrentUser(): Promise<Heroku.PipelineCoupling[]> {
    const response = await this.heroku.get<Heroku.PipelineCoupling[]>(`/users/~/pipeline-couplings`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List pipeline couplings.
   *
   */
  public async list(): Promise<Heroku.PipelineCoupling[]> {
    const response = await this.heroku.get<Heroku.PipelineCoupling[]>(`/pipeline-couplings`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List pipeline couplings for a team.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   */
  public async listByTeam(teamIdentity: string): Promise<Heroku.PipelineCoupling[]> {
    const response = await this.heroku.get<Heroku.PipelineCoupling[]>(`/teams/${teamIdentity}/pipeline-couplings`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Create a new pipeline coupling.
   *
   * @param body Object to send to the endpoint.
   */
  public async create(body: Heroku.PipelineCouplingCreatePayload): Promise<Heroku.PipelineCoupling> {
    const response = await this.heroku.post<Heroku.PipelineCoupling>(`/pipeline-couplings`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Info for an existing pipeline coupling.
   *
   * @param pipelineCouplingIdentity unique identifier of pipeline coupling.
   */
  public async info(pipelineCouplingIdentity: string): Promise<Heroku.PipelineCoupling> {
    const response = await this.heroku.get<Heroku.PipelineCoupling>(`/pipeline-couplings/${pipelineCouplingIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Delete an existing pipeline coupling.
   *
   * @param pipelineCouplingIdentity unique identifier of pipeline coupling.
   */
  public async delete(pipelineCouplingIdentity: string): Promise<Heroku.PipelineCoupling> {
    const response = await this.heroku.delete<Heroku.PipelineCoupling>(
      `/pipeline-couplings/${pipelineCouplingIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.body;
  }
  /**
   * Update an existing pipeline coupling.
   *
   * @param pipelineCouplingIdentity unique identifier of pipeline coupling.
   * @param body Object to send to the endpoint.
   */
  public async update(
    pipelineCouplingIdentity: string,
    body: Heroku.PipelineCouplingUpdatePayload
  ): Promise<Heroku.PipelineCoupling> {
    const response = await this.heroku.patch<Heroku.PipelineCoupling>(
      `/pipeline-couplings/${pipelineCouplingIdentity}`,
      {
        body,
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.body;
  }
  /**
   * Info for an existing pipeline coupling.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async infoByApp(appIdentity: string): Promise<Heroku.PipelineCoupling> {
    const response = await this.heroku.get<Heroku.PipelineCoupling>(`/apps/${appIdentity}/pipeline-couplings`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
