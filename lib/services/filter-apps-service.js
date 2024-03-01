/**
 Heroku Platform API - Filters
Filters are special endpoints to allow for API consumers to specify a subset of resources to consume in order to reduce the number of requests that are performed.  Each filter endpoint endpoint is responsible for determining its supported request format.  The endpoints are over POST in order to handle large request bodies without hitting request uri query length limitations, but the requests themselves are idempotent and will not have side effects.

*/
export default class FilterAppsService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Request an apps list filtered by app id.
 *
 * @param body Object to send to the endpoint.
 */
    async apps(body) {
        const response = await this.heroku.post(`/filters/apps`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
