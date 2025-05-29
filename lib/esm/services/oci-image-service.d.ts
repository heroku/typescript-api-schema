import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - OCI Images](https://devcenter.heroku.com/articles/platform-api-reference#oci-image)
 * An OCI (Open Container Initiative) image is a standardized format for packaging and distributing containerized applications, ready to run on the platform.
 */
export default class OciImageService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Info for the OCI images of an app, filtered by identifier.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param ociImageIdentity unique identifier of the OCI image or unique identifier representing the content of the OCI image.
     * @param requestInit The initializer for the request.
     */
    info(appIdentity: string, ociImageIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.OciImage[]>;
    /**
     * Create an new OCI image of an app
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(appIdentity: string, payload: Heroku.OciImageCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.OciImage>;
}
