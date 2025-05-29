import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Build Metadata](https://devcenter.heroku.com/articles/platform-api-reference#build-metadata)
 * Build metadata contains the reference data for building the associated App.
 */
export default class BuildMetadataService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Build metadata for app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    info(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.BuildMetadata>;
}
