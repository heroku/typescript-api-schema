import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Coupling](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-coupling)
* Information about an app's coupling to a pipeline
*/
export default class PipelineCouplingService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * List couplings for a pipeline
 *
 * @param pipelineId unique identifier of pipeline
 * @example 01234567-89ab-cdef-0123-456789abcdef.
 */
    listByPipeline(pipelineId: string): Promise<Heroku.PipelineCoupling[]>;
    /**
     * List pipeline couplings for the current user.
     *
     */
    listByCurrentUser(): Promise<Heroku.PipelineCoupling[]>;
    /**
     * List pipeline couplings.
     *
     */
    list(): Promise<Heroku.PipelineCoupling[]>;
    /**
     * List pipeline couplings for a team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     */
    listByTeam(teamIdentity: string): Promise<Heroku.PipelineCoupling[]>;
    /**
     * Create a new pipeline coupling.
     *
     * @param body Object to send to the endpoint.
     */
    create(body: Heroku.PipelineCouplingCreatePayload): Promise<Heroku.PipelineCoupling>;
    /**
     * Info for an existing pipeline coupling.
     *
     * @param pipelineCouplingIdentity unique identifier of pipeline coupling.
     */
    info(pipelineCouplingIdentity: string): Promise<Heroku.PipelineCoupling>;
    /**
     * Delete an existing pipeline coupling.
     *
     * @param pipelineCouplingIdentity unique identifier of pipeline coupling.
     */
    delete(pipelineCouplingIdentity: string): Promise<Heroku.PipelineCoupling>;
    /**
     * Update an existing pipeline coupling.
     *
     * @param pipelineCouplingIdentity unique identifier of pipeline coupling.
     * @param body Object to send to the endpoint.
     */
    update(pipelineCouplingIdentity: string, body: Heroku.PipelineCouplingUpdatePayload): Promise<Heroku.PipelineCoupling>;
    /**
     * Info for an existing pipeline coupling.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    infoByApp(appIdentity: string): Promise<Heroku.PipelineCoupling>;
}
