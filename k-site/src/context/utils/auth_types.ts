export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  pwd: string;
  captcha?: string | null;
}

export interface RegisterPayload {
  firstname: string;
  lastname?: string;
  email: string;
  phone: string;
  college: string;
  city: string;
  state: string;
  dept: string;
  roll?: string;
  dob?: string;
  year?: number;
  pwd?: string;
  gauthToken?: string;
  code?: string;
  captcha?: string | null;
}

export interface GooglePayload {
  accessId: string;
  captcha?: string | null;
}

export interface ForgotPasswordPayload {
  email: string;
  captcha?: string | null;
}

export interface ResetPasswordPayload {
  pwd: string;
  user?: string;
  key?: string;
  captcha?: string | null;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  handleKLogin: (data: LoginPayload) => void;
  handleKRegister: (data: RegisterPayload) => void;
  handleGoogleOAuth: (data: GooglePayload) => void;
  handleForgotPassword: (data: ForgotPasswordPayload) => void;
  handleResetPassword: (data: ResetPasswordPayload) => void;
  handleLogout: () => void;
}
