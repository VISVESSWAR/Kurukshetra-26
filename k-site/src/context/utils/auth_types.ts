export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface GooglePayload {
  credential: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  handleKLogin: (data: LoginPayload) => void;
  handleKRegister: (data: RegisterPayload) => void;
  handleGoogleOAuth: (data: GooglePayload) => void;
  handleForgotPassword: (data: ForgotPasswordPayload) => void;
  handleLogout: () => void;
}
