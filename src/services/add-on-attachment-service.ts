import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Attachment](https://devcenter.heroku.com/articles/platform-api-reference#add-on-attachment)
 * An add-on attachment represents a connection between an app and an add-on that it has been given access to.
 */
export default class AddOnAttachmentService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new add-on attachment.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    payload: Heroku.AddOnAttachmentCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOnAttachment> {
    const response = await this.fetchImpl(`${this.endpoint}/addon-attachments`, {
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
      return (await response.json()) as Promise<Heroku.AddOnAttachment>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Delete an existing add-on attachment.
   *
   * @param addOnAttachmentIdentity unique identifier of this add-on attachment.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    addOnAttachmentIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOnAttachment> {
    const response = await this.fetchImpl(`${this.endpoint}/addon-attachments/${addOnAttachmentIdentity}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOnAttachment>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for existing add-on attachment.
   *
   * @param addOnAttachmentIdentity unique identifier of this add-on attachment.
   * @param requestInit The initializer for the request.
   */
  public async info(
    addOnAttachmentIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOnAttachment> {
    const response = await this.fetchImpl(`${this.endpoint}/addon-attachments/${addOnAttachmentIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOnAttachment>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing add-on attachments.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.AddOnAttachment[]> {
    const response = await this.fetchImpl(`${this.endpoint}/addon-attachments`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOnAttachment[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing add-on attachments for an add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param requestInit The initializer for the request.
   */
  public async listByAddOn(
    addOnIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOnAttachment[]> {
    const response = await this.fetchImpl(`${this.endpoint}/addons/${addOnIdentity}/addon-attachments`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOnAttachment[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing add-on attachments for an app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async listByApp(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOnAttachment[]> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/addon-attachments`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOnAttachment[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for existing add-on attachment for an app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param addOnAttachmentScopedIdentity unique identifier of this add-on attachment or unique name for this add-on attachment to this app.
   * @param requestInit The initializer for the request.
   */
  public async infoByApp(
    appIdentity: string,
    addOnAttachmentScopedIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOnAttachment> {
    const response = await this.fetchImpl(
      `${this.endpoint}/apps/${appIdentity}/addon-attachments/${addOnAttachmentScopedIdentity}`,
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
      return (await response.json()) as Promise<Heroku.AddOnAttachment>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Resolve an add-on attachment from a name, optionally passing an app name. If there are matches it returns at least one add-on attachment (exact match) or many.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async resolution(
    payload: Heroku.AddOnAttachmentResolutionPayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOnAttachment[]> {
    const response = await this.fetchImpl(`${this.endpoint}/actions/addon-attachments/resolve`, {
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
      return (await response.json()) as Promise<Heroku.AddOnAttachment[]>;
    }
    throw new Error(response.statusText);
  }
}
