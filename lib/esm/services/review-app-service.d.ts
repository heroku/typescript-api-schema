import * as Heroku from '@heroku-cli/schema';
/**
 * [Review App](https://devcenter.heroku.com/articles/platform-api-reference#review-app)
 * An ephemeral app to review a set of changes
 */
export default class ReviewAppService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new review app
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.ReviewAppCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.ReviewApp>;
    /**
     * Gets an existing review app
     *
     * @param reviewAppId unique identifier of the review app.
     * @param requestInit The initializer for the request.
     */
    getReviewApp(reviewAppId: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.ReviewApp>;
    /**
     * Delete an existing review app
     *
     * @param reviewAppId unique identifier of the review app.
     * @param requestInit The initializer for the request.
     */
    delete(reviewAppId: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.ReviewApp>;
    /**
     * Get a review app using the associated app_id
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    getReviewAppByAppId(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.ReviewApp>;
    /**
     * List review apps for a pipeline
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param requestInit The initializer for the request.
     */
    list(pipelineId: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.ReviewApp[]>;
}
