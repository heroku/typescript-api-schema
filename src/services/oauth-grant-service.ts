/**
 * [Heroku Platform API - OAuth Grant](https://devcenter.heroku.com/articles/platform-api-reference#oauth-grant)
 * OAuth grants are used to obtain authorizations on behalf of a user. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)
 */
export default class OauthGrantService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}
}
