export class Decedent {
    id?: number;
    //links to the user object that holds information for it
    user_id: number;
    //links to the matter 
    matter_id: number;
    // personal representative
    personal_representative_id: number;

    date_of_birth: string;
    place_of_birth: string;
    date_of_death: string;
    place_of_death: string;
    date_of_naturalization: string;
    place_of_naturalization: string;
    date_of_will: string;
    date_of_codicils: string;
    us_citizen: boolean;
    naturalized_citizen: boolean;

    constructor(user_id: number, matter_id: number, personal_representative_id: number) {
        this.user_id = user_id;
        this.matter_id = matter_id;
        this.personal_representative_id = personal_representative_id;
    }

}