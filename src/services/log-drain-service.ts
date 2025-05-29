import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Log Drain](https://devcenter.heroku.com/articles/platform-api-reference#log-drain)
 * [Log drains](https://devcenter.heroku.com/articles/log-drains) provide a way to forward your Heroku logs to an external syslog server for long-term archiving. This external service must be configured to receive syslog packets from Heroku, whereupon its URL can be added to an app using this API. Some add-ons will add a log drain when they are provisioned to an app. These drains can only be removed by removing the add-on.
 */
export default class LogDrainService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new log drain.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    appIdentity: string,
    payload: Heroku.LogDrainCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.LogDrain> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/log-drains`, {
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
      return (await response.json()) as Promise<Heroku.LogDrain>;
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
   * Update an add-on owned log drain.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param logDrainQueryIdentity unique identifier of this log drain or url associated with the log drain or token associated with the log drain.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    addOnIdentity: string,
    logDrainQueryIdentity: string,
    payload: Heroku.LogDrainUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.LogDrain> {
    const response = await this.fetchImpl(
      `${this.endpoint}/addons/${addOnIdentity}/log-drains/${logDrainQueryIdentity}`,
      {
        ...requestInit,
        body: JSON.stringify(payload, null, 2),
        method: 'PUT',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3.sdk',
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.LogDrain>;
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
   * Delete an existing log drain. Log drains added by add-ons can only be removed by removing the add-on.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param logDrainQueryIdentity unique identifier of this log drain or url associated with the log drain or token associated with the log drain.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    appIdentity: string,
    logDrainQueryIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.LogDrain> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/log-drains/${logDrainQueryIdentity}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.LogDrain>;
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
   * Info for existing log drain.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param logDrainQueryIdentity unique identifier of this log drain or url associated with the log drain or token associated with the log drain.
   * @param requestInit The initializer for the request.
   */
  public async info(
    appIdentity: string,
    logDrainQueryIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.LogDrain> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/log-drains/${logDrainQueryIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.LogDrain>;
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
   * List existing log drains for an add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param requestInit The initializer for the request.
   */
  public async listByAddOn(
    addOnIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.LogDrain[]> {
    const response = await this.fetchImpl(`${this.endpoint}/addons/${addOnIdentity}/log-drains`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.LogDrain[]>;
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
   * List existing log drains.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async list(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.LogDrain[]> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/log-drains`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.LogDrain[]>;
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
