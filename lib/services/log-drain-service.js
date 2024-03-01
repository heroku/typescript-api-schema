/**
 Heroku Platform API - Log Drain
[Log drains](https://devcenter.heroku.com/articles/log-drains) provide a way to forward your Heroku logs to an external syslog server for long-term archiving. This external service must be configured to receive syslog packets from Heroku, whereupon its URL can be added to an app using this API. Some add-ons will add a log drain when they are provisioned to an app. These drains can only be removed by removing the add-on.

*/
export default class LogDrainService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new log drain.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    async create(appIdentity, body) {
        const response = await this.heroku.post(`/apps/${appIdentity}/log-drains`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Update an add-on owned log drain.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param logDrainQueryIdentity unique identifier of this log drain or url associated with the log drain or token associated with the log drain.
     * @param body Object to send to the endpoint.
     */
    async update(addOnIdentity, logDrainQueryIdentity, body) {
        const response = await this.heroku.put(`/addons/${addOnIdentity}/log-drains/${logDrainQueryIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Delete an existing log drain. Log drains added by add-ons can only be removed by removing the add-on.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param logDrainQueryIdentity unique identifier of this log drain or url associated with the log drain or token associated with the log drain.
     */
    async delete(appIdentity, logDrainQueryIdentity) {
        const response = await this.heroku.delete(`/apps/${appIdentity}/log-drains/${logDrainQueryIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for existing log drain.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param logDrainQueryIdentity unique identifier of this log drain or url associated with the log drain or token associated with the log drain.
     */
    async info(appIdentity, logDrainQueryIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/log-drains/${logDrainQueryIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing log drains for an add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     */
    async listByAddOn(addOnIdentity) {
        const response = await this.heroku.get(`/addons/${addOnIdentity}/log-drains`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing log drains.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async list(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/log-drains`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
