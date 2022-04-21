
module.exports = (sequelize, {
    INTEGER,
    STRING,
    TEXT,
    FLOAT,
    BOOLEAN
  }) => {
    const tableName = 'finanacial_summary';
  
    const FinancialSummary = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id : {
            type: INTEGER,
            allowNull : false,
        },
        // this section will have the summarys for income
        social_security: {
            type: FLOAT,
        },
        pension: {
            type: FLOAT,
        },
        work: {
            type: FLOAT,
        },
        annuity : {
            type: FLOAT,
        },
        other : {
            type: FLOAT,
        },
        income_total : {
            type: FLOAT,
        },

        // end of income summary

        // this section will be for the assets summary

        // not that these will be the totals for the accounts, not the individual accounts
        checking : {
            type: FLOAT,
        },
        savings : {
            type: FLOAT,
        },
        other_bank : {
            type: FLOAT,
        },
        nc_bank : {
            type: FLOAT,
        },
        // 401k = employer_retirement_plan
        employer_retirement_plan : {
            type: FLOAT,
        },
        ira : {
            type: FLOAT,
        },
        other_qualified_investment : {
            type: FLOAT,
        },
        // nc means non countable
        nc_employer_retirement_plan : {
            type: FLOAT,
        },
        nc_ira : {
            type: FLOAT,
        },
        nc_other_qualified_investment : {
            type: FLOAT,
        },
        unqualified_investment : {
            type: FLOAT,
        },
        hard_assets : {
            type: FLOAT,
        },
        other_unqualified_investment : {
            type: FLOAT,
        },
        nc_unqualified_investment : {
            type: FLOAT,
        },
        nc_hard_assets : {
            type: FLOAT,
        },
        nc_other_unqualified_investment : {
            type: FLOAT,
        },

        is_joint : {
            type: BOOLEAN,
        },

        joint_user_id : {
            type: INTEGER,
        },

      }, {
        tableName
      },
    );
  
    return FinancialSummary;
  }