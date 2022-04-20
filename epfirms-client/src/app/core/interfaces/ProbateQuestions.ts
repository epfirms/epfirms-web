export class ProbateQuestions {
    matter_id: number;
    user_id: number;
    date_of_birth: string;
    place_of_birth: string;
    date_of_death: string;
    place_of_death: string;
    us_citizen: boolean;
    naturalized_citizen: boolean;
    date_of_naturalization?: string;
    place_of_naturalization?: string;
    date_of_will: string;
    date_of_codicils: string;
    personal_representative_id?: number;
    alternative_representative_id?: number;
    


    constructor() {

    }
}