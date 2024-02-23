import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Log Drain](https://devcenter.heroku.com/articles/platform-api-reference#log-drain)
 * [Log drains](https://devcenter.heroku.com/articles/log-drains) provide a way to forward your Heroku logs to an external syslog server for long-term archiving. This external service must be configured to receive syslog packets from Heroku, whereupon its URL can be added to an app using this API. Some add-ons will add a log drain when they are provisioned to an app. These drains can only be removed by removing the add-on.
 */
export default class LogDrainService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new log drain.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(appIdentity: string, payload: Heroku.LogDrainCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.LogDrain>;
    /**
     * Update an add-on owned log drain.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param logDrainQueryIdentity unique identifier of this log drain or url associated with the log drain or token associated with the log drain.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(addOnIdentity: string, logDrainQueryIdentity: string, payload: Heroku.LogDrainUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.LogDrain>;
    /**
     * Delete an existing log drain. Log drains added by add-ons can only be removed by removing the add-on.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param logDrainQueryIdentity unique identifier of this log drain or url associated with the log drain or token associated with the log drain.
     * @param requestInit The initializer for the request.
     */
    delete(appIdentity: string, logDrainQueryIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.LogDrain>;
    /**
     * Info for existing log drain.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param logDrainQueryIdentity unique identifier of this log drain or url associated with the log drain or token associated with the log drain.
     * @param requestInit The initializer for the request.
     */
    info(appIdentity: string, logDrainQueryIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.LogDrain>;
    /**
     * List existing log drains for an add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param requestInit The initializer for the request.
     */
    listByAddOn(addOnIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.LogDrain[]>;
    /**
     * List existing log drains.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    list(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.LogDrain[]>;
}
