export interface AuthUserProfile {
  id: number;
  admin: boolean;
  client_access: any[];
  firm_access: {
    id: number;
    firm_id: number;
    user_id: number;
    admin: boolean;
    active: boolean;
    hourly_rate: string;
    // TODO: Change type to roles[]
    role: string;
    created_at: string;
    updated_at: string;
  };
  iss: string;
  aud: string;
  auth_time: number;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: boolean;
  firebase: any;
}

export interface AuthNewUser {
  email: string;
  password: string;
}

export interface AuthLoginCredential {
  email: string;
  password: string;
}
