import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Collaborator](https://devcenter.heroku.com/articles/platform-api-reference#collaborator)
 * A collaborator represents an account that has been given access to an app on Heroku.
 */
export default class CollaboratorService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new collaborator.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    appIdentity: string,
    payload: Heroku.CollaboratorCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Collaborator> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/collaborators`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'POST',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Collaborator>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Delete an existing collaborator.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param collaboratorIdentity invited email address of collaborator or unique identifier of collaborator.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    appIdentity: string,
    collaboratorIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Collaborator> {
    const response = await this.fetchImpl(
      `${this.endpoint}/apps/${appIdentity}/collaborators/${collaboratorIdentity}`,
      {
        ...requestInit,

        method: 'DELETE',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Collaborator>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for existing collaborator.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param collaboratorIdentity invited email address of collaborator or unique identifier of collaborator.
   * @param requestInit The initializer for the request.
   */
  public async info(
    appIdentity: string,
    collaboratorIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Collaborator> {
    const response = await this.fetchImpl(
      `${this.endpoint}/apps/${appIdentity}/collaborators/${collaboratorIdentity}`,
      {
        ...requestInit,

        method: 'GET',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Collaborator>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing collaborators.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async list(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Collaborator[]> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/collaborators`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Collaborator[]>;
    }
    throw new Error(response.statusText);
  }
}
