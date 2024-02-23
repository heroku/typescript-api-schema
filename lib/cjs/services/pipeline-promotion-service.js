"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Pipeline Promotion](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-promotion)
 * Promotions allow you to move code from an app in a pipeline to all targets
 */
class PipelinePromotionService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Create a new promotion.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async create(payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/pipeline-promotions`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'POST',
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
     * Info for existing pipeline promotion.
     *
     * @param pipelinePromotionIdentity unique identifier of promotion.
     * @param requestInit The initializer for the request.
     */
    async info(pipelinePromotionIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/pipeline-promotions/${pipelinePromotionIdentity}`, {
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
}
exports.default = PipelinePromotionService;
