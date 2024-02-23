/**
 Heroku Platform API - Log Session
A log session is a reference to the http based log stream for an app.

*/
export default class LogSessionService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new log session.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    async create(appIdentity, body) {
        const response = await this.heroku.post(`/apps/${appIdentity}/log-sessions`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
