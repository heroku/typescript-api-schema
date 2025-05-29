import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Coupling](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-coupling)
 * Information about an app's coupling to a pipeline
 */
export default class PipelineCouplingService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * List couplings for a pipeline
   *
   * @param pipelineId unique identifier of pipeline
   * @example "01234567-89ab-cdef-0123-456789abcdef".
   * @param requestInit The initializer for the request.
   */
  public async listByPipeline(
    pipelineId: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.PipelineCoupling[]> {
    const response = await this.fetchImpl(`${this.endpoint}/pipelines/${pipelineId}/pipeline-couplings`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PipelineCoupling[]>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
  /**
   * List pipeline couplings for the current user.
   *
   * @param requestInit The initializer for the request.
   */
  public async listByCurrentUser(
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.PipelineCoupling[]> {
    const response = await this.fetchImpl(`${this.endpoint}/users/~/pipeline-couplings`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PipelineCoupling[]>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
  /**
   * List pipeline couplings.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.PipelineCoupling[]> {
    const response = await this.fetchImpl(`${this.endpoint}/pipeline-couplings`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PipelineCoupling[]>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
  /**
   * List pipeline couplings for a team.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param requestInit The initializer for the request.
   */
  public async listByTeam(
    teamIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.PipelineCoupling[]> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/pipeline-couplings`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PipelineCoupling[]>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
  /**
   * Create a new pipeline coupling.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    payload: Heroku.PipelineCouplingCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.PipelineCoupling> {
    const response = await this.fetchImpl(`${this.endpoint}/pipeline-couplings`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'POST',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PipelineCoupling>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
  /**
   * Info for an existing pipeline coupling.
   *
   * @param pipelineCouplingIdentity unique identifier of pipeline coupling.
   * @param requestInit The initializer for the request.
   */
  public async info(
    pipelineCouplingIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.PipelineCoupling> {
    const response = await this.fetchImpl(`${this.endpoint}/pipeline-couplings/${pipelineCouplingIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PipelineCoupling>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
  /**
   * Delete an existing pipeline coupling.
   *
   * @param pipelineCouplingIdentity unique identifier of pipeline coupling.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    pipelineCouplingIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.PipelineCoupling> {
    const response = await this.fetchImpl(`${this.endpoint}/pipeline-couplings/${pipelineCouplingIdentity}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PipelineCoupling>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
  /**
   * Update an existing pipeline coupling.
   *
   * @param pipelineCouplingIdentity unique identifier of pipeline coupling.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    pipelineCouplingIdentity: string,
    payload: Heroku.PipelineCouplingUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.PipelineCoupling> {
    const response = await this.fetchImpl(`${this.endpoint}/pipeline-couplings/${pipelineCouplingIdentity}`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'PATCH',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PipelineCoupling>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
  /**
   * Info for an existing pipeline coupling.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async infoByApp(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.PipelineCoupling> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/pipeline-couplings`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PipelineCoupling>;
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
