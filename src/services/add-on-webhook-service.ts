import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Webhook](https://devcenter.heroku.com/articles/platform-api-reference#add-on-webhook)
 * Represents the details of a webhook subscription
 */
export default class AddOnWebhookService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    addOnIdentity: string,
    payload: Heroku.AddOnWebhookCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddonWebhook> {
    const response = await this.fetchImpl(`${this.endpoint}/addons/${addOnIdentity}/webhooks`, {
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
      return (await response.json()) as Promise<Heroku.AddonWebhook>;
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
   * Removes an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param appWebhookIdentity the webhook's unique identifier.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    addOnIdentity: string,
    appWebhookIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddonWebhook> {
    const response = await this.fetchImpl(`${this.endpoint}/addons/${addOnIdentity}/webhooks/${appWebhookIdentity}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddonWebhook>;
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
   * Returns the info for an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param appWebhookIdentity the webhook's unique identifier.
   * @param requestInit The initializer for the request.
   */
  public async info(
    addOnIdentity: string,
    appWebhookIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddonWebhook> {
    const response = await this.fetchImpl(`${this.endpoint}/addons/${addOnIdentity}/webhooks/${appWebhookIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddonWebhook>;
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
   * List all webhook subscriptions for a particular add-on.  Can only be accessed by the add-on partner providing this add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param requestInit The initializer for the request.
   */
  public async list(
    addOnIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddonWebhook[]> {
    const response = await this.fetchImpl(`${this.endpoint}/addons/${addOnIdentity}/webhooks`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddonWebhook[]>;
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
   * Updates the details of an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param appWebhookIdentity the webhook's unique identifier.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    addOnIdentity: string,
    appWebhookIdentity: string,
    payload: Heroku.AddOnWebhookUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddonWebhook> {
    const response = await this.fetchImpl(`${this.endpoint}/addons/${addOnIdentity}/webhooks/${appWebhookIdentity}`, {
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
      return (await response.json()) as Promise<Heroku.AddonWebhook>;
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
