export class Referral {
    id?: number;
    matter_id: number;
    firm_id: number;
    date: string;
    friend_or_family: boolean;
    professional: boolean;
    referral_name?: string;
    google: boolean;
    bing: boolean;
    other_search_engine: boolean;
    facebook: boolean;
    twitter: boolean;
    other_social_media: boolean;
    aarag: boolean;
    metlegal: boolean;
    other_legal_insurance: boolean;
    other: boolean;

    constructor(matter_id: number) {
        this.matter_id = matter_id;
        this.date = new Date().toISOString();
    }
}