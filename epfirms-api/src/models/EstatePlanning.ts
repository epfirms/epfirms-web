
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT
  }) => {
    const tableName = 'estate_planning';

    const EstatePlanning = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        // this is a reference to the User object that holds the appointor information
        user_id: {
          type: INTEGER,
          allowNull: false,
        },
       // this is a reference to the specific matter
        matter_id: {
            type: INTEGER,
            allowNull: false
        },
        // will the client and spouse include afterborn children?
        include_afterborn_children: {
            type: BOOLEAN,
        },
        // will the client or spouse exclude any children as beneficiaries?
        exclude_children: {
            type: BOOLEAN,
        },
        // include a memorandum?
        include_memorandum: {
            type: BOOLEAN,
        },
        // client burial request
        client_burial_request: {
            type: STRING,
        },
        // spouse burial request
        spouse_burial_request: {
            type: STRING,
        },
        // include common disater clause?
        include_common_disaster_clause: {
            type: BOOLEAN,
        },
        // has specific requests? this is more to enforce a referece to the specific requests table
        has_specific_requests: {
            type: BOOLEAN,
        },
        // include an arbitration clause?
        include_arbitration_clause: {
            type: BOOLEAN,
        },
        // include Contest clause?  
        include_contest_clause: {
            type: BOOLEAN,
        },
        // is the No Contest Clause unenforceable under challenge?
        no_contest_clause_unenforceable_under_challenge: {
            type: BOOLEAN,
        },
        // include supplemental needs trust?
        include_supplemental_needs_trust: {
            type: BOOLEAN,
        },
        // include contingent trust?
        include_contingent_trust: {
            type: BOOLEAN,
        },
        // contingent trust age of distribution
        contingent_trust_age_of_distribution: {
            type: INTEGER,
        },
        // include retirement benefit trust?
        include_retirement_benefit_trust: {
            type: BOOLEAN,
        },
        // trust age of distribution
        trust_age_of_distribution: {
            type: INTEGER,
        },
        distribution_request: {
            type: TEXT,
        },
        // does client have current will?
        client_has_current_will: {
            type: BOOLEAN,
        },
        // does spouse have current will?
        spouse_has_current_will: {
            type: BOOLEAN,
        },
        // does client have current estate plan?
        client_has_current_estate_plan: {
            type: BOOLEAN,
        },
        // does spouse have current estate plan?
        spouse_has_current_estate_plan: {
            type: BOOLEAN,
        },
        // does client have established trust?
        client_has_established_trust: {
            type: BOOLEAN,
        },
        // does spouse have established trust?
        spouse_has_established_trust: {
            type: BOOLEAN,
        },
        // does client own a farm or business?
        has_farm_or_business: {
            type: BOOLEAN,
        },
        // do any of the client's children receive benefits from state or government?
        children_receive_govt_benefits: {
            type: BOOLEAN,
        },
        // do any of your children have special education needs?
        children_have_special_education_needs: {
            type: BOOLEAN,
        },
        // do any of your children have special medical needs?
        children_have_special_medical_needs: {
            type: BOOLEAN,
        },
        // has client ever made gift exceeding 130000 or filed federal gift tax return?
        client_filed_gift_tax_return: {
            type: BOOLEAN,
        },
        client_prior_divorce: {
            type: BOOLEAN,
        },
        spouse_prior_divorce: {
            type: BOOLEAN,
        },
        // client pays settlement expenses?
        client_pays_settlement_expenses: {
            type: BOOLEAN,
        },
        // spouse pays settlement expenses?
        spouse_pays_settlement_expenses: {
            type: BOOLEAN,
        },
        // client signed pre marital agreement?
        client_signed_pre_marital_agreement: {
            type: BOOLEAN,
        },
        // spouse signed pre marital agreement?
        spouse_signed_pre_marital_agreement: {
            type: BOOLEAN,
        },
        //client signed post marital agreement?
        client_signed_post_marital_agreement: {
            type: BOOLEAN,
        },
        // spouse signed post marital agreement?
        spouse_signed_post_marital_agreement: {
            type: BOOLEAN,
        },
        
     }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return EstatePlanning;
  };
