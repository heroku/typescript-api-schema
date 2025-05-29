import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Telemetry Ingress Info](https://devcenter.heroku.com/articles/platform-api-reference#telemetry-ingress-info)
 * Telemetry Ingress Info allows add-on partners to view authorization information required to write to Fir app logs.
 */
export default class TelemetryIngressInfoService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Fetch telemetry ingress info.
     *
     * @param addOnAttachmentIdentity unique identifier of this add-on attachment.
     * @param requestInit The initializer for the request.
     */
    info(addOnAttachmentIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TelemetryIngressInfo>;
}
