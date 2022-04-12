export class SpecificRequests {
    id: number;
    // beneficiary_id: number;
    // contingent_beneficiary_id: number;
    beneficiary_name?: string;
    contingent_beneficiary_name?: string;
    item_name?: string;
    defer_until_spouse_deceased?: boolean;
    matter_id?: number;


    constructor(matter_id : number) {
        this.matter_id = matter_id;
    }
}