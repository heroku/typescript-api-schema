import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - PasswordReset](https://devcenter.heroku.com/articles/platform-api-reference#password-reset)
 * A password reset represents a in-process password reset attempt.
 */
export default class PasswordResetService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Reset account's password. This will send a reset password link to the user's email address.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async resetPassword(
    payload: Heroku.PasswordResetResetPasswordPayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.PasswordReset> {
    const response = await this.fetchImpl(`${this.endpoint}/password-resets`, {
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
      return (await response.json()) as Promise<Heroku.PasswordReset>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Complete password reset.
   *
   * @param passwordResetResetPasswordToken unique identifier of a password reset attempt
   * @example "01234567-89ab-cdef-0123-456789abcdef".
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async completeResetPassword(
    passwordResetResetPasswordToken: string,
    payload: Heroku.PasswordResetCompleteResetPasswordPayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.PasswordReset> {
    const response = await this.fetchImpl(
      `${this.endpoint}/password-resets/${passwordResetResetPasswordToken}/actions/finalize`,
      {
        ...requestInit,
        body: JSON.stringify(payload, null, 2),
        method: 'POST',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PasswordReset>;
    }
    throw new Error(response.statusText);
  }
}
