import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Account Feature](https://devcenter.heroku.com/articles/platform-api-reference#account-feature)
 * An account feature represents a Heroku labs capability that can be enabled or disabled for an account on Heroku.
 */
export default class AccountFeatureService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Info for an existing account feature.
     *
     * @param accountFeatureIdentity unique identifier of account feature or unique name of account feature.
     * @param requestInit The initializer for the request.
     */
    info(accountFeatureIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AccountFeature>;
    /**
     * List existing account features.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AccountFeature[]>;
    /**
     * Update an existing account feature.
     *
     * @param accountFeatureIdentity unique identifier of account feature or unique name of account feature.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(accountFeatureIdentity: string, payload: Heroku.AccountFeatureUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AccountFeature>;
}
