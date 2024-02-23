"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - OAuth Grant](https://devcenter.heroku.com/articles/platform-api-reference#oauth-grant)
 * OAuth grants are used to obtain authorizations on behalf of a user. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)
 */
class OauthGrantService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
}
exports.default = OauthGrantService;
