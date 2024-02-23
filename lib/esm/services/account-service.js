/**
 * [Heroku Platform API - Account](https://devcenter.heroku.com/articles/platform-api-reference#account)
 * An account represents an individual signed up to use the Heroku platform.
 */
export default class AccountService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Info for account.
     *
     * @param requestInit The initializer for the request.
     */
    async info(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * Update account.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async update(payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'PATCH',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * Delete account. Note that this action cannot be undone. Note: This endpoint requires the HTTP_HEROKU_PASSWORD or HTTP_HEROKU_PASSWORD_BASE64 header be set correctly for the user account.
     *
     * @param requestInit The initializer for the request.
     */
    async delete(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account`, {
            ...requestInit,
            method: 'DELETE',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * Info for account.
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param requestInit The initializer for the request.
     */
    async infoByUser(accountIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/users/${accountIdentity}`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * Update account.
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async updateByUser(accountIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/users/${accountIdentity}`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'PATCH',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * Delete account. Note that this action cannot be undone. Note: This endpoint requires the HTTP_HEROKU_PASSWORD or HTTP_HEROKU_PASSWORD_BASE64 header be set correctly for the user account.
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param requestInit The initializer for the request.
     */
    async deleteByUser(accountIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/users/${accountIdentity}`, {
            ...requestInit,
            method: 'DELETE',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
}
