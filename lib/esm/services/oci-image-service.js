/**
 * [Heroku Platform API - OCI Images](https://devcenter.heroku.com/articles/platform-api-reference#oci-image)
 * An OCI (Open Container Initiative) image is a standardized format for packaging and distributing containerized applications, ready to run on the platform.
 */
export default class OciImageService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Info for the OCI images of an app, filtered by identifier.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param ociImageIdentity unique identifier of the OCI image or unique identifier representing the content of the OCI image.
     * @param requestInit The initializer for the request.
     */
    async info(appIdentity, ociImageIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/oci-images/${ociImageIdentity}`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
    /**
     * Create an new OCI image of an app
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async create(appIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/oci-images`, {
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
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
}
