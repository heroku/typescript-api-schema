import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on](https://devcenter.heroku.com/articles/platform-api-reference#add-on)
 * Add-ons represent add-ons that have been provisioned and attached to one or more apps.
 */
export default class AddOnService {
  public constructor(protected readonly fetchImpl: typeof fetch) {}

  /**
   * List all existing add-ons.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.AddOn[]> {
    const response = await this.fetchImpl(`/addons`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOn[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for an existing add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param requestInit The initializer for the request.
   */
  public async info(
    addOnIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOn> {
    const response = await this.fetchImpl(`/addons/${addOnIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOn>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Create a new add-on.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    appIdentity: string,
    payload: Heroku.AddOnCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOn> {
    const response = await this.fetchImpl(`/apps/${appIdentity}/addons`, {
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
      return (await response.json()) as Promise<Heroku.AddOn>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Delete an existing add-on.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    appIdentity: string,
    addOnIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOn> {
    const response = await this.fetchImpl(`/apps/${appIdentity}/addons/${addOnIdentity}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOn>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for an existing add-on.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param requestInit The initializer for the request.
   */
  public async infoByApp(
    appIdentity: string,
    addOnIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOn> {
    const response = await this.fetchImpl(`/apps/${appIdentity}/addons/${addOnIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOn>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing add-ons for an app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async listByApp(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOn[]> {
    const response = await this.fetchImpl(`/apps/${appIdentity}/addons`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOn[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Change add-on plan. Some add-ons may not support changing plans. In that case, an error will be returned.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    appIdentity: string,
    addOnIdentity: string,
    payload: Heroku.AddOnUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOn> {
    const response = await this.fetchImpl(`/apps/${appIdentity}/addons/${addOnIdentity}`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'PATCH',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOn>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List all existing add-ons a user has access to
   *
   * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
   * @param requestInit The initializer for the request.
   */
  public async listByUser(
    accountIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOn[]> {
    const response = await this.fetchImpl(`/users/${accountIdentity}/addons`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOn[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List add-ons used across all Team apps
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param requestInit The initializer for the request.
   */
  public async listByTeam(
    teamIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOn[]> {
    const response = await this.fetchImpl(`/teams/${teamIdentity}/addons`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOn[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Resolve an add-on from a name, optionally passing an app name. If there are matches it returns at least one add-on (exact match) or many.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async resolution(
    payload: Heroku.AddOnResolutionPayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOn[]> {
    const response = await this.fetchImpl(`/actions/addons/resolve`, {
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
      return (await response.json()) as Promise<Heroku.AddOn[]>;
    }
    throw new Error(response.statusText);
  }
}