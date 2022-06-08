import { UserProfile } from './user-profile';

export class Staff {
  id: number;

  active: boolean;

  user: UserProfile;

  hourly_rate?: number;

  firm_id: number;

  user_id: number;

  admin: boolean;

  role:
    | 'attorney'
    | 'associate attorney'
    | 'paralegal'
    | 'legal assistant'
    | 'receptionist'
    | 'office manager'
    | 'other';
}
