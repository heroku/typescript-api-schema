import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Space](https://devcenter.heroku.com/articles/platform-api-reference#space)
 * A space is an isolated, highly available, secure app execution environment.
 */
export default class SpaceService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List existing spaces.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Space[]>;
    /**
     * Info for existing space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    info(spaceIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Space>;
    /**
     * Update an existing space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(spaceIdentity: string, payload: Heroku.SpaceUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Space>;
    /**
     * Delete an existing space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    delete(spaceIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Space>;
    /**
     * Create a new space.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.SpaceCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Space>;
}
