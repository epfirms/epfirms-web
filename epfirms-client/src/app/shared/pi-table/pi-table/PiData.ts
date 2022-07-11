/**
 * @description Data that is used for the dynamic forms on the personal information table.
 */
export class PiData {
  id?: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  cell_phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  county: string;
  profile_image: string;
  full_name: string;
  ssn: string;
  drivers_id: string;
  note: string;
  has_special_needs: boolean;
  is_minor: boolean;
  has_spouse: boolean;
  
  constructor() {
    this.first_name = '';
    this.middle_name = '';
    this.last_name = '';
    this.dob = '';
    this.email = '';
    this.phone = '';
    this.cell_phone = '';
    this.address = '';
    this.city = '';
    this.state = '';
    this.zip = '';
    this.county = '';
    this.profile_image = '';
    this.full_name = '';
    this.ssn = '';
    this.drivers_id = '';
    this.note = '';
    this.has_special_needs = false;
    this.is_minor = false;
    this.has_spouse = false;
  }
}
