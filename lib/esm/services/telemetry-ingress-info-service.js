/**
 * [Heroku Platform API - Telemetry Ingress Info](https://devcenter.heroku.com/articles/platform-api-reference#telemetry-ingress-info)
 * Telemetry Ingress Info allows add-on partners to view authorization information required to write to Fir app logs.
 */
export default class TelemetryIngressInfoService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Fetch telemetry ingress info.
     *
     * @param addOnAttachmentIdentity unique identifier of this add-on attachment.
     * @param requestInit The initializer for the request.
     */
    async info(addOnAttachmentIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/addon-attachments/${addOnAttachmentIdentity}/telemetry-ingress-info`, {
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
}
