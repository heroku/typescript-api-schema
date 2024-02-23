/**
 Heroku Platform API - Pipeline Coupling
Information about an app's coupling to a pipeline

*/
export default class PipelineCouplingService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List couplings for a pipeline
 *
 * @param pipelineId unique identifier of pipeline.
 */
    async listByPipeline(pipelineId) {
        const response = await this.heroku.get(`/pipelines/${pipelineId}/pipeline-couplings`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List pipeline couplings for the current user.
     *
     */
    async listByCurrentUser() {
        const response = await this.heroku.get(`/users/~/pipeline-couplings`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List pipeline couplings.
     *
     */
    async list() {
        const response = await this.heroku.get(`/pipeline-couplings`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List pipeline couplings for a team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     */
    async listByTeam(teamIdentity) {
        const response = await this.heroku.get(`/teams/${teamIdentity}/pipeline-couplings`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Create a new pipeline coupling.
     *
     * @param body Object to send to the endpoint.
     */
    async create(body) {
        const response = await this.heroku.post(`/pipeline-couplings`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for an existing pipeline coupling.
     *
     * @param pipelineCouplingIdentity unique identifier of pipeline coupling.
     */
    async info(pipelineCouplingIdentity) {
        const response = await this.heroku.get(`/pipeline-couplings/${pipelineCouplingIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Delete an existing pipeline coupling.
     *
     * @param pipelineCouplingIdentity unique identifier of pipeline coupling.
     */
    async delete(pipelineCouplingIdentity) {
        const response = await this.heroku.delete(`/pipeline-couplings/${pipelineCouplingIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Update an existing pipeline coupling.
     *
     * @param pipelineCouplingIdentity unique identifier of pipeline coupling.
     * @param body Object to send to the endpoint.
     */
    async update(pipelineCouplingIdentity, body) {
        const response = await this.heroku.patch(`/pipeline-couplings/${pipelineCouplingIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for an existing pipeline coupling.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async infoByApp(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/pipeline-couplings`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
