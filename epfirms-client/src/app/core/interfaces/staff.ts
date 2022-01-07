import { EmployeeRole } from './role';
import { UserProfile } from './user-profile';

export class Staff {
  id: number;
  active: boolean;
  role: EmployeeRole[];
  user: UserProfile;
  hourly_rate?: number;
}
