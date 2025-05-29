import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Action](https://devcenter.heroku.com/articles/platform-api-reference#add-on-action)
 * Add-on Actions are lifecycle operations for add-on provisioning and deprovisioning. They allow add-on providers to (de)provision add-ons in the background and then report back when (de)provisioning is complete.
 */
export default class AddOnActionService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Mark an add-on as provisioned for use.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param requestInit The initializer for the request.
   */
  public async provision(
    addOnIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOn> {
    const response = await this.fetchImpl(`${this.endpoint}/addons/${addOnIdentity}/actions/provision`, {
      ...requestInit,

      method: 'POST',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOn>;
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
   * Mark an add-on as deprovisioned.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param requestInit The initializer for the request.
   */
  public async deprovision(
    addOnIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOn> {
    const response = await this.fetchImpl(`${this.endpoint}/addons/${addOnIdentity}/actions/deprovision`, {
      ...requestInit,

      method: 'POST',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOn>;
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
   * Add or update a peering connection to an add-on
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async peer(
    addOnIdentity: string,
    payload: Heroku.AddOnActionPeerPayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Record<string, unknown>> {
    const response = await this.fetchImpl(`${this.endpoint}/addons/${addOnIdentity}/actions/peer`, {
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
      return (await response.json()) as Promise<Record<string, unknown>>;
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
   * Remove a peering connection from an add-on
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async unpeer(
    addOnIdentity: string,
    payload: Record<string, unknown>,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Record<string, unknown>> {
    const response = await this.fetchImpl(`${this.endpoint}/addons/${addOnIdentity}/actions/unpeer`, {
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
      return (await response.json()) as Promise<Record<string, unknown>>;
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
