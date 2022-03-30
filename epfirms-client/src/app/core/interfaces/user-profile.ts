export interface UserProfile {
  id?: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  address?: string;
  city?: string;
  zip?: string;
  created_at?: string;
  updated_at?: string;
  dob?: string;
  gender?: string;
  middle_name?: string;
  phone?: string;
  preferred_name?: string;
  profile_image?: string;
  state?: string;
  verified?: boolean;
  ssn?: string;
  is_minor?: boolean;
  dl_number?: string;
  num_of_children?: number;
  num_of_stepchildren?: number;
  has_spouse?: boolean;
  has_children?: boolean;
  has_stepchildren?: boolean;
}