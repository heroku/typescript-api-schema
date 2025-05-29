import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Generation](https://devcenter.heroku.com/articles/platform-api-reference#generation)
 * A generation represents a version of the Heroku platform that includes the app execution environment, routing, telemetry, and build systems.
 */
export default class GenerationService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Info for generation.
   *
   * @param stackIdentity unique name of stack or unique identifier of stack.
   * @param requestInit The initializer for the request.
   */
  public async info(
    stackIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Generation> {
    const response = await this.fetchImpl(`${this.endpoint}/generations/${stackIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Generation>;
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
   * List available generations.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.Generation[]> {
    const response = await this.fetchImpl(`${this.endpoint}/generations`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Generation[]>;
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
   * List available generations for a team.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param requestInit The initializer for the request.
   */
  public async listGenerations(
    teamIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Generation[]> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/available-generations`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Generation[]>;
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
