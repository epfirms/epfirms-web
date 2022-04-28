module.exports = (sequelize, { INTEGER, STRING, TEXT, FLOAT, BOOLEAN }) => {
  const tableName = 'finanacial_summary';

  const FinancialSummary = sequelize.define(
    tableName,
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      user_id: {
        type: INTEGER,
        allowNull: false,
      },
      // this section will have the summarys for income
      social_security: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      pension: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      work: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      annuity: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      business_income: {
        type: FLOAT,
        defaultValue: 0.0,
      },

      other: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      income_total: {
        type: FLOAT,
        defaultValue: 0.0,
      },

      // end of income summary

      // this section will be for the assets summary

      // not that these will be the totals for the accounts, not the individual accounts
      checking: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      savings: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      other_bank: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      nc_bank: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      // 401k = employer_retirement_plan
      employer_retirement_plan: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      ira: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      other_qualified_investment: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      // nc means non countable
      nc_employer_retirement_plan: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      nc_ira: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      nc_other_qualified_investment: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      unqualified_investment: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      hard_assets: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      other_unqualified_investment: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      nc_unqualified_investment: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      nc_hard_assets: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      nc_other_unqualified_investment: {
        type: FLOAT,
        defaultValue: 0.0,
      },

      is_joint: {
        type: BOOLEAN,
        defaultValue: false,
      },

      joint_user_id: {
        type: INTEGER,
      },
      total_unqualified_investment: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      total_nc: {
        type: FLOAT,
        defaultValue: 0.0,

      },
      total_countable: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      total_unprotected : {
        type: FLOAT,
        defaultValue: 0.0,
      },
      total_assets: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      // real estate summary section will consist of primary and then 4 additional
      primary_residence_address: {
        type: STRING,
        defaultValue: '',
      },
      primary_residence_value: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      primary_residence_loan_amount: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      property_1_address: {
        type: STRING,
        defaultValue: '',
      },
      property_1_value: {
        type: FLOAT,
        defaultValue: 0.0,

      },
      property_1_loan_amount: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      property_2_address: {
        type: STRING,
        defaultValue: '',
      },
      property_2_value: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      property_2_loan_amount: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      property_3_address: {
        type: STRING,
        defaultValue: '',
      },
      property_3_value: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      property_3_loan_amount: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      property_4_address: {
        type: STRING,
        defaultValue: '',
      },
      property_4_value: {
        type: FLOAT,
        defaultValue: 0.0,
      },
      property_4_loan_amount: {
        type: FLOAT,
        defaultValue: 0.0,
      }
    },
    {
      tableName,
    },
  );

  return FinancialSummary;
};
