import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Space Log Drain](https://devcenter.heroku.com/articles/platform-api-reference#space-log-drain)
 * Single log drain for all apps in a Private Space
 */
export default class SpaceLogDrainService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Current log drain for a space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    info(spaceIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.LogDrain>;
    /**
     * Update log drain for a space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(spaceIdentity: string, payload: Heroku.SpaceLogDrainUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.LogDrain>;
}
