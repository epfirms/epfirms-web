export class ExcludedChildren {
    id?: number;
    matter_id?: number;
    user_id?: number;

    constructor(matter_id : number) {
        this.matter_id = matter_id;
    }
}