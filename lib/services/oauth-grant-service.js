/**
 Heroku Platform API - OAuth Grant
OAuth grants are used to obtain authorizations on behalf of a user. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)

*/
export default class OauthGrantService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
}
