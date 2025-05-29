import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Generation](https://devcenter.heroku.com/articles/platform-api-reference#generation)
 * A generation represents a version of the Heroku platform that includes the app execution environment, routing, telemetry, and build systems.
 */
export default class GenerationService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Info for generation.
     *
     * @param stackIdentity unique name of stack or unique identifier of stack.
     * @param requestInit The initializer for the request.
     */
    info(stackIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Generation>;
    /**
     * List available generations.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Generation[]>;
    /**
     * List available generations for a team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    listGenerations(teamIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Generation[]>;
}
