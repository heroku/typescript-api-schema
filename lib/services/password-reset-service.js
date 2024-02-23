/**
 Heroku Platform API - PasswordReset
A password reset represents a in-process password reset attempt.

*/
export default class PasswordResetService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Reset account's password. This will send a reset password link to the user's email address.
 *
 * @param body Object to send to the endpoint.
 */
    async resetPassword(body) {
        const response = await this.heroku.post(`/password-resets`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Complete password reset.
     *
     * @param passwordResetResetPasswordToken unique identifier of a password reset attempt.
     * @param body Object to send to the endpoint.
     */
    async completeResetPassword(passwordResetResetPasswordToken, body) {
        const response = await this.heroku.post(`/password-resets/${passwordResetResetPasswordToken}/actions/finalize`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
