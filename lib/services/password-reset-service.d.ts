import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - PasswordReset](https://devcenter.heroku.com/articles/platform-api-reference#password-reset)
* A password reset represents a in-process password reset attempt.
*/
export default class PasswordResetService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Reset account's password. This will send a reset password link to the user's email address.
 *
 * @param body Object to send to the endpoint.
 */
    resetPassword(body: Heroku.PasswordResetResetPasswordPayload): Promise<Heroku.PasswordReset>;
    /**
     * Complete password reset.
     *
     * @param passwordResetResetPasswordToken unique identifier of a password reset attempt
     * @example 01234567-89ab-cdef-0123-456789abcdef.
     * @param body Object to send to the endpoint.
     */
    completeResetPassword(passwordResetResetPasswordToken: string, body: Heroku.PasswordResetCompleteResetPasswordPayload): Promise<Heroku.PasswordReset>;
}
