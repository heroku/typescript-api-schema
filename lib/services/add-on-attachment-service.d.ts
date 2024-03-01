import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Attachment](https://devcenter.heroku.com/articles/platform-api-reference#add-on-attachment)
* An add-on attachment represents a connection between an app and an add-on that it has been given access to.
*/
export default class AddOnAttachmentService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new add-on attachment.
 *
 * @param body Object to send to the endpoint.
 */
    create(body: Heroku.AddOnAttachmentCreatePayload): Promise<Heroku.AddOnAttachment>;
    /**
     * Delete an existing add-on attachment.
     *
     * @param addOnAttachmentIdentity unique identifier of this add-on attachment.
     */
    delete(addOnAttachmentIdentity: string): Promise<Heroku.AddOnAttachment>;
    /**
     * Info for existing add-on attachment.
     *
     * @param addOnAttachmentIdentity unique identifier of this add-on attachment.
     */
    info(addOnAttachmentIdentity: string): Promise<Heroku.AddOnAttachment>;
    /**
     * List existing add-on attachments.
     *
     */
    list(): Promise<Heroku.AddOnAttachment[]>;
    /**
     * List existing add-on attachments for an add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     */
    listByAddOn(addOnIdentity: string): Promise<Heroku.AddOnAttachment[]>;
    /**
     * List existing add-on attachments for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    listByApp(appIdentity: string): Promise<Heroku.AddOnAttachment[]>;
    /**
     * Info for existing add-on attachment for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param addOnAttachmentScopedIdentity unique identifier of this add-on attachment or unique name for this add-on attachment to this app.
     */
    infoByApp(appIdentity: string, addOnAttachmentScopedIdentity: string): Promise<Heroku.AddOnAttachment>;
    /**
     * Resolve an add-on attachment from a name, optionally passing an app name. If there are matches it returns at least one add-on attachment (exact match) or many.
     *
     * @param body Object to send to the endpoint.
     */
    resolution(body: Heroku.AddOnAttachmentResolutionPayload): Promise<Heroku.AddOnAttachment[]>;
}
