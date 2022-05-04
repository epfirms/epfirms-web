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

    constructor(matter_id: number, type: string, referral_name?: string) {
        this.matter_id = matter_id;
        this.date = new Date().toISOString();
        console.log("on create", type, referral_name);
        if (type === 'friend_or_family') {
            this.friend_or_family = true;
            this.referral_name = referral_name;
        } else if (type === 'professional') {
            this.professional = true;
            this.referral_name = referral_name;
        }
        else if (type === 'google') {
            this.google = true;
        }
        else if (type === 'bing') {
            this.bing = true;
        }
        else if (type === 'facebook') {
            this.facebook = true;
        }
        else if (type === 'twitter') {
            this.twitter = true;
        }
        else if (type === 'other_search_engine') {
            this.other_search_engine = true;
        }
        else if (type === 'aarag') {
            this.aarag = true;
        }
        else if (type === 'metlegal') {
            this.metlegal = true;
        }
        else if (type === 'other_legal_insurance') {
            this.other_legal_insurance = true;
        }
        else if (type === 'other') {
            this.other = true;
        }
    }
}