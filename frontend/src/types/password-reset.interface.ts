export interface ForgotPasswordDto extends Record<string, unknown> {
  email: string;
}

export interface VerifyCodeDto extends Record<string, unknown> {
  email: string;
  code: string;
}

export interface NewPasswordDto extends Record<string, unknown> {
  resetToken?: string;
  newPassword: string;
}

export interface VerifyCodeResponse {
  resetToken: string;
}
