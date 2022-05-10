export class Decedent {
    id?: number;
    //links to the user object that holds information for it
    user_id: number;
    //links to the matter 
    matter_id: number;
    // personal representative
    personal_representative_id: number;


    constructor(user_id: number, matter_id: number, personal_representative_id: number) {
        this.user_id = user_id;
        this.matter_id = matter_id;
        this.personal_representative_id = personal_representative_id;
    }

}