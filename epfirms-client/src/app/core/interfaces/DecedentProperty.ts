export class DecedentProperty {
    id?: number;
    user_id: number;
    matter_id: number;
    decedent_id: number;
    value: number;
    name: string;
    beneficiary: string;
    note: string;

    constructor(user_id: number, matter_id: number, decedent_id: number) {
        this.user_id = user_id;
        this.matter_id = matter_id;
        this.decedent_id = decedent_id;
        this.value = 0;
        this.name = '';
        this.beneficiary = '';
        this.note = '';
    }

}