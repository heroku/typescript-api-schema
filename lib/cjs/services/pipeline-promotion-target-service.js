"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Pipeline Promotion Target](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-promotion-target)
 * Promotion targets represent an individual app being promoted to
 */
class PipelinePromotionTargetService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * List promotion targets belonging to an existing promotion.
     *
     * @param pipelinePromotionId unique identifier of promotion
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param requestInit The initializer for the request.
     */
    async list(pipelinePromotionId, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/pipeline-promotions/${pipelinePromotionId}/promotion-targets`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
}
exports.default = PipelinePromotionTargetService;
