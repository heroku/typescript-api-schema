import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - PasswordReset](https://devcenter.heroku.com/articles/platform-api-reference#password-reset)
 * A password reset represents a in-process password reset attempt.
 */
export default class PasswordResetService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Reset account's password. This will send a reset password link to the user's email address.
   *
   * @param body Object to send to the endpoint.
   */
  public async resetPassword(body: Heroku.PasswordResetResetPasswordPayload): Promise<Heroku.PasswordReset> {
    const response = await this.heroku.post<Heroku.PasswordReset>(`/password-resets`, {
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
   * @param passwordResetResetPasswordToken unique identifier of a password reset attempt
   * @example 01234567-89ab-cdef-0123-456789abcdef.
   * @param body Object to send to the endpoint.
   */
  public async completeResetPassword(
    passwordResetResetPasswordToken: string,
    body: Heroku.PasswordResetCompleteResetPasswordPayload
  ): Promise<Heroku.PasswordReset> {
    const response = await this.heroku.post<Heroku.PasswordReset>(
      `/password-resets/${passwordResetResetPasswordToken}/actions/finalize`,
      {
        body,
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.body;
  }
}
