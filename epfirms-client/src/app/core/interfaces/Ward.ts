export class Ward {
    id?: number;
    //links to the user object that holds information for it
    user_id: number;
    //links to the matter
    matter_id: number;

    // this is the user id for the caregiver who holds/manages the case
    caregiver_id: number;


    constructor(user_id: number, matter_id: number, caregiver_id: number) {
        this.user_id = user_id;
        this.matter_id = matter_id;
        this.caregiver_id = caregiver_id;
    }
}