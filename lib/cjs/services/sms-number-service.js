"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - SMS Number](https://devcenter.heroku.com/articles/platform-api-reference#sms-number)
 * SMS numbers are used for recovery on accounts with two-factor authentication enabled.
 */
class SmsNumberService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Recover an account using an SMS recovery code
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param requestInit The initializer for the request.
     */
    async smsNumber(accountIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/users/${accountIdentity}/sms-number`, {
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
    /**
     * Recover an account using an SMS recovery code
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param requestInit The initializer for the request.
     */
    async recover(accountIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/users/${accountIdentity}/sms-number/actions/recover`, {
            ...requestInit,
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
     * Confirm an SMS number change with a confirmation code
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param requestInit The initializer for the request.
     */
    async confirm(accountIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/users/${accountIdentity}/sms-number/actions/confirm`, {
            ...requestInit,
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
}
exports.default = SmsNumberService;
