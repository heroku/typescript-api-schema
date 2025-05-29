import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Telemetry Ingress Info](https://devcenter.heroku.com/articles/platform-api-reference#telemetry-ingress-info)
 * Telemetry Ingress Info allows add-on partners to view authorization information required to write to Fir app logs.
 */
export default class TelemetryIngressInfoService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Fetch telemetry ingress info.
   *
   * @param addOnAttachmentIdentity unique identifier of this add-on attachment.
   * @param requestInit The initializer for the request.
   */
  public async info(
    addOnAttachmentIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TelemetryIngressInfo> {
    const response = await this.fetchImpl(
      `${this.endpoint}/addon-attachments/${addOnAttachmentIdentity}/telemetry-ingress-info`,
      {
        ...requestInit,

        method: 'GET',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3.sdk'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TelemetryIngressInfo>;
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
