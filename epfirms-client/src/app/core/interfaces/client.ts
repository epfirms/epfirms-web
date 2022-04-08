import { Matter } from "./matter";

export class Client {
    id: number;

    full_name?: string;

    first_name: string;

    middle_name?: string;

    last_name: string;

    dob?: string;

    gender?: string;

    email?: string;

    phone?: string;

    cell_phone?: string;

    address?: string;

    city?: string;

    state?: string;

    zip?: string;

    profile_image?: string;

    // TODO: Change client property to matters
    client?: Matter[];

    verified?: Boolean;
  }