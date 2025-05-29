"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - PasswordReset](https://devcenter.heroku.com/articles/platform-api-reference#password-reset)
 * A password reset represents a in-process password reset attempt.
 */
class PasswordResetService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Reset account's password. This will send a reset password link to the user's email address.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async resetPassword(payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/password-resets`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'POST',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk',
                'Content-Type': 'application/json'
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
    /**
     * Complete password reset.
     *
     * @param passwordResetResetPasswordToken unique identifier of a password reset attempt
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async completeResetPassword(passwordResetResetPasswordToken, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/password-resets/${passwordResetResetPasswordToken}/actions/finalize`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'POST',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk',
                'Content-Type': 'application/json'
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
exports.default = PasswordResetService;
