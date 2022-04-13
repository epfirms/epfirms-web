export class EstatePlanningQuestions {
     id?: number;
        
        // this is a reference to the User object that holds the appointor information
        user_id: number;
       // this is a reference to the specific matter
        matter_id: number;
        // will the client and spouse include afterborn children?
        include_afterborn_children?: boolean;
        // will the client or spouse exclude any children as beneficiaries?
        exclude_children?: boolean;
        // include a memorandum?
        include_memorandum?: boolean;
        // client burial request
        client_burial_request?: string;
        // spouse burial request
        spouse_burial_request?: string;
        // include common disater clause?
        include_common_disaster_clause?: boolean;
        // has specific requests? this is more to enforce a referece to the specific requests table
        has_specific_requests?: boolean;
        // include an arbitration clause?
        include_arbitration_clause?: boolean;
        // include Contest clause?  
        include_contest_clause?: boolean;
        // is the No Contest Clause unenforceable under challenge?
        no_contest_clause_unenforceable_under_challenge?: boolean;
        // include supplemental needs trust?
        include_supplemental_needs_trust?: boolean;
        // include contingent trust?
        include_contingent_trust?: boolean;
        // contingent trust age of distribution
        contingent_trust_age_of_distribution?: number;
        // include retirement benefit trust?
        include_retirement_benefit_trust?: boolean;
        // trust age of distribution
        trust_age_of_distribution?: number;
        distribution_request?: boolean;
        // does client have current will?
        client_has_current_will?: boolean;
        // does spouse have current will?
        spouse_has_current_will?: boolean;
        // does client have current estate plan?
        client_has_current_estate_plan?: boolean;
        // does spouse have current estate plan?
        spouse_has_current_estate_plan?: boolean;
        // does client have established trust?
        client_has_established_trust?: boolean;
        // does spouse have established trust?
        spouse_has_established_trust?: boolean;
        // does client own a farm or business?
        has_farm_or_business?: boolean;
        // do any of the client's children receive benefits from state or government?
        children_receive_govt_benefits?: boolean;
        // do any of your children have special education needs?
        children_have_special_education_needs?: boolean;
        // do any of your children have special medical needs?
        children_have_special_medical_needs?: boolean;
        // has client ever made gift exceeding 130000 or filed federal gift tax return?
        client_filed_gift_tax_return?: boolean;
        client_prior_divorce?: boolean;
        spouse_prior_divorce?: boolean;
        // client pays settlement expenses?
        client_pays_settlement_expenses?: boolean;
        // spouse pays settlement expenses?
        spouse_pays_settlement_expenses?: boolean;
        // client signed pre marital agreement?
        client_signed_pre_marital_agreement?: boolean;
        // spouse signed pre marital agreement?
        spouse_signed_pre_marital_agreement?: boolean;
        //client signed post marital agreement?
        client_signed_post_marital_agreement?: boolean;
        // spouse signed post marital agreement?
        spouse_signed_post_marital_agreement?: boolean;

        constructor(user_id : number, matter_id : number) {
                this.user_id = user_id;
                this.matter_id = matter_id;
        }
}