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
    },
    {
      tableName,
    },
  );

  return FinancialSummary;
};
