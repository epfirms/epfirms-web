export class Staff {
    id: number;
    first_name: string;
    middle_name?: string;
    last_name: string;
    dob?: string;
    gender?: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    profile_image?: string;
    firms: any[];
    verified?: Boolean;
  }