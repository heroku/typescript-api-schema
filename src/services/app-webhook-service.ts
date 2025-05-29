import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Webhook](https://devcenter.heroku.com/articles/platform-api-reference#app-webhook)
 * Represents the details of a webhook subscription
 */
export default class AppWebhookService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create an app webhook subscription.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    appIdentity: string,
    payload: Heroku.AppWebhookCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppWebhook> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/webhooks`, {
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
      return (await response.json()) as Promise<Heroku.AppWebhook>;
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
   * Removes an app webhook subscription.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param appWebhookIdentity the webhook's unique identifier.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    appIdentity: string,
    appWebhookIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppWebhook> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/webhooks/${appWebhookIdentity}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AppWebhook>;
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
   * Returns the info for an app webhook subscription.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param appWebhookIdentity the webhook's unique identifier.
   * @param requestInit The initializer for the request.
   */
  public async info(
    appIdentity: string,
    appWebhookIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppWebhook> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/webhooks/${appWebhookIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AppWebhook>;
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
   * List all webhook subscriptions for a particular app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async list(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppWebhook[]> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/webhooks`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AppWebhook[]>;
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
   * Updates the details of an app webhook subscription.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param appWebhookIdentity the webhook's unique identifier.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    appIdentity: string,
    appWebhookIdentity: string,
    payload: Heroku.AppWebhookUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppWebhook> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/webhooks/${appWebhookIdentity}`, {
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
      return (await response.json()) as Promise<Heroku.AppWebhook>;
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
