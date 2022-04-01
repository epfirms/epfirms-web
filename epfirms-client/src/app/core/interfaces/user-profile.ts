import { EmployeeRole } from "./role";

export interface UserProfile {
  full_name?: string;
  id?: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  preferred_name?: string;
  dob?: string;
  gender?: 'Male' | 'Female';
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  county?: string;
  profile_image?: string;
  verified?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type ClientAccess = any;

export interface FirmAccess {
  firm_id: number;
  user_id: number;
  admin: boolean;
  hourly_rate?: string;
  twilio_phone_number?: string;
  created_at: string;
  updated_at: string;
  role: EmployeeRole[];
}

export interface UserScope {
  client_access: ClientAccess[];
  firm_access: FirmAccess;
}
