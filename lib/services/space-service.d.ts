import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Space](https://devcenter.heroku.com/articles/platform-api-reference#space)
* A space is an isolated, highly available, secure app execution environment.
*/
export default class SpaceService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * List existing spaces.
 *
 */
    list(): Promise<Heroku.Space[]>;
    /**
     * Info for existing space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     */
    info(spaceIdentity: string): Promise<Heroku.Space>;
    /**
     * Update an existing space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param body Object to send to the endpoint.
     */
    update(spaceIdentity: string, body: Heroku.SpaceUpdatePayload): Promise<Heroku.Space>;
    /**
     * Delete an existing space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     */
    delete(spaceIdentity: string): Promise<Heroku.Space>;
    /**
     * Create a new space.
     *
     * @param body Object to send to the endpoint.
     */
    create(body: Heroku.SpaceCreatePayload): Promise<Heroku.Space>;
}
