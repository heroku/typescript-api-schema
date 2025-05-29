import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Telemetry Drain](https://devcenter.heroku.com/articles/platform-api-reference#telemetry-drain)
 * A telemetry drain forwards OpenTelemetry traces, metrics, and logs to your own consumer. For Fir-generation apps only.
 */
export default class TelemetryDrainService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a telemetry drain.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.TelemetryDrainCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TelemetryDrain>;
    /**
     * List telemetry drains for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    listByApp(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TelemetryDrain[]>;
    /**
     * List telemetry drains for a space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    listBySpace(spaceIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TelemetryDrain[]>;
    /**
     * Update a telemetry drain.
     *
     * @param telemetryDrainIdentity unique identifier of telemetry drain.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(telemetryDrainIdentity: string, payload: Heroku.TelemetryDrainUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TelemetryDrain>;
    /**
     * Delete a telemetry drain.
     *
     * @param telemetryDrainIdentity unique identifier of telemetry drain.
     * @param requestInit The initializer for the request.
     */
    delete(telemetryDrainIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TelemetryDrain>;
    /**
     * Info for a telemetry drain.
     *
     * @param telemetryDrainIdentity unique identifier of telemetry drain.
     * @param requestInit The initializer for the request.
     */
    info(telemetryDrainIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TelemetryDrain>;
}
