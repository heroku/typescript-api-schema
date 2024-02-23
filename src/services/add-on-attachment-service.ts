import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Attachment](https://devcenter.heroku.com/articles/platform-api-reference#add-on-attachment)
 * An add-on attachment represents a connection between an app and an add-on that it has been given access to.
 */
export default class AddOnAttachmentService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new add-on attachment.
   *
   * @param body Object to send to the endpoint.
   */
  public async create(body: Heroku.AddOnAttachmentCreatePayload): Promise<Heroku.AddOnAttachment> {
    const response = await this.heroku.post<Heroku.AddOnAttachment>(`/addon-attachments`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Delete an existing add-on attachment.
   *
   * @param addOnAttachmentIdentity unique identifier of this add-on attachment.
   */
  public async delete(addOnAttachmentIdentity: string): Promise<Heroku.AddOnAttachment> {
    const response = await this.heroku.delete<Heroku.AddOnAttachment>(`/addon-attachments/${addOnAttachmentIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Info for existing add-on attachment.
   *
   * @param addOnAttachmentIdentity unique identifier of this add-on attachment.
   */
  public async info(addOnAttachmentIdentity: string): Promise<Heroku.AddOnAttachment> {
    const response = await this.heroku.get<Heroku.AddOnAttachment>(`/addon-attachments/${addOnAttachmentIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing add-on attachments.
   *
   */
  public async list(): Promise<Heroku.AddOnAttachment[]> {
    const response = await this.heroku.get<Heroku.AddOnAttachment[]>(`/addon-attachments`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing add-on attachments for an add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   */
  public async listByAddOn(addOnIdentity: string): Promise<Heroku.AddOnAttachment[]> {
    const response = await this.heroku.get<Heroku.AddOnAttachment[]>(`/addons/${addOnIdentity}/addon-attachments`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing add-on attachments for an app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async listByApp(appIdentity: string): Promise<Heroku.AddOnAttachment[]> {
    const response = await this.heroku.get<Heroku.AddOnAttachment[]>(`/apps/${appIdentity}/addon-attachments`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Info for existing add-on attachment for an app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param addOnAttachmentScopedIdentity unique identifier of this add-on attachment or unique name for this add-on attachment to this app.
   */
  public async infoByApp(appIdentity: string, addOnAttachmentScopedIdentity: string): Promise<Heroku.AddOnAttachment> {
    const response = await this.heroku.get<Heroku.AddOnAttachment>(
      `/apps/${appIdentity}/addon-attachments/${addOnAttachmentScopedIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * Resolve an add-on attachment from a name, optionally passing an app name. If there are matches it returns at least one add-on attachment (exact match) or many.
   *
   * @param body Object to send to the endpoint.
   */
  public async resolution(body: Heroku.AddOnAttachmentResolutionPayload): Promise<Heroku.AddOnAttachment[]> {
    const response = await this.heroku.post<Heroku.AddOnAttachment[]>(`/actions/addon-attachments/resolve`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
