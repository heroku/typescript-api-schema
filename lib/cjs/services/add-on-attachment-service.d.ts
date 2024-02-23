import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Attachment](https://devcenter.heroku.com/articles/platform-api-reference#add-on-attachment)
 * An add-on attachment represents a connection between an app and an add-on that it has been given access to.
 */
export default class AddOnAttachmentService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new add-on attachment.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.AddOnAttachmentCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOnAttachment>;
    /**
     * Delete an existing add-on attachment.
     *
     * @param addOnAttachmentIdentity unique identifier of this add-on attachment.
     * @param requestInit The initializer for the request.
     */
    delete(addOnAttachmentIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOnAttachment>;
    /**
     * Info for existing add-on attachment.
     *
     * @param addOnAttachmentIdentity unique identifier of this add-on attachment.
     * @param requestInit The initializer for the request.
     */
    info(addOnAttachmentIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOnAttachment>;
    /**
     * List existing add-on attachments.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOnAttachment[]>;
    /**
     * List existing add-on attachments for an add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param requestInit The initializer for the request.
     */
    listByAddOn(addOnIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOnAttachment[]>;
    /**
     * List existing add-on attachments for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    listByApp(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOnAttachment[]>;
    /**
     * Info for existing add-on attachment for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param addOnAttachmentScopedIdentity unique identifier of this add-on attachment or unique name for this add-on attachment to this app.
     * @param requestInit The initializer for the request.
     */
    infoByApp(appIdentity: string, addOnAttachmentScopedIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOnAttachment>;
    /**
     * Resolve an add-on attachment from a name, optionally passing an app name. If there are matches it returns at least one add-on attachment (exact match) or many.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    resolution(payload: Heroku.AddOnAttachmentResolutionPayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOnAttachment[]>;
}
