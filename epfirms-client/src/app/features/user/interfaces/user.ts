export interface UserCompact {
  id?: number;
  full_name: string;
  email: string;
  phone?: string;
  profile_image?: string;
}

export interface User extends UserCompact {
  first_name: string;
  middle_name?: string;
  last_name: string;
  preferred_name?: string;
  dob?: string;
  gender?: 'Male' | 'Female';
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  county?: string;
  verified?: boolean;
  created_at?: string;
  updated_at?: string;
}