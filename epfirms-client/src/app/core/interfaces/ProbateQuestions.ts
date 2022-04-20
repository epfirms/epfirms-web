export class ProbateQuestions {
    matter_id: number;
    user_id: number;
    date_of_birth = "";
    place_of_birth = "";
    date_of_death = "";
    place_of_death = "";
    us_citizen: boolean;
    naturalized_citizen: boolean;
    date_of_naturalization? = "";
    place_of_naturalization? = "";
    date_of_will = "";
    date_of_codicils = "";
    personal_representative_id?: number;
    alternative_representative_id?: number;
    


    constructor() {

        
    }
}