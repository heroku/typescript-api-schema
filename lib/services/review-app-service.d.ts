import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Review App](https://devcenter.heroku.com/articles/platform-api-reference#review-app)
* An ephemeral app to review a set of changes
*/
export default class ReviewAppService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new review app
 *
 * @param body Object to send to the endpoint.
 */
    create(body: Heroku.ReviewAppCreatePayload): Promise<Heroku.ReviewApp>;
    /**
     * Gets an existing review app
     *
     * @param reviewAppId unique identifier of the review app.
     */
    getReviewApp(reviewAppId: string): Promise<Heroku.ReviewApp>;
    /**
     * Delete an existing review app
     *
     * @param reviewAppId unique identifier of the review app.
     */
    delete(reviewAppId: string): Promise<Heroku.ReviewApp>;
    /**
     * Get a review app using the associated app_id
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    getReviewAppByAppId(appIdentity: string): Promise<Heroku.ReviewApp>;
    /**
     * List review apps for a pipeline
     *
     * @param pipelineId unique identifier of pipeline
     * @example 01234567-89ab-cdef-0123-456789abcdef.
     */
    list(pipelineId: string): Promise<Heroku.ReviewApp[]>;
}
