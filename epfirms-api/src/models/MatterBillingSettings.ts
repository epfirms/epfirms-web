module.exports = (sequelize, { INTEGER, BOOLEAN, STRING, TEXT, JSON, FLOAT, DATE }) => {
  const tableName = 'matter_billing_settings';

  const MatterBillingSettings = sequelize.define(
    tableName,
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      matter_id: {
        type: INTEGER,
        allowNull: false,
      },
      billing_type: {
        type: STRING,
        defaultValue: 'flatrate',
      },
      payment_type: {
        type: STRING,
        defaultValue: 'private pay',
      },

      contingency_percent: {
        type: FLOAT,
        defaultValue: 0,
      },
      // flat rate specifics

      flat_rate_amount: {
        type: FLOAT,
        defaultValue: 0,
      },
      split_flat_rate: {
        type: BOOLEAN,
      },
      initial_payment: {
        type: FLOAT,
        defaultValue: 0,
      },
      final_payment: {
        type: FLOAT,
        defaultValue: 0,
      },
      final_payment_due_date: {
        type: DATE,
      },
      initial_invoice_message: {
        type: TEXT,
        defaultValue: '',
      },
      final_invoice_message: {
        type: TEXT,
        defaultValue: '',
      },
      // hourly specifics
      retainer_amount: {
        type: FLOAT,
        defaultValue: 0,
      },
      retainer_invoice_message: {
        type: TEXT,
        defaultValue: '',
      },

      //contingency specifics
      // settlement amounts are percents
      //appeal amount is also percent
      before_settlement: {
        type: FLOAT,
        defaultValue: 0,
      },
      after_settlement: {
        type: FLOAT,
        defaultValue: 0,
      },
      settlement_date: {
        type: DATE,
      },
      appeal_amount: {
        type: FLOAT,
        defaultValue: 0,
      },

      // insurance specifics
      company_name: {
        type: STRING,
        defaultValue: '',
      },
      policy_holder_name: {
        type: STRING,
        defaultValue: '',
      },
      policy_number: {
        type: STRING,
        defaultValue: '',
      },
      claim_number: {
        type: STRING,
        defaultValue: '',
      },
      insurance_notes: {
        type: TEXT,
        defaultValue: '',
      },

      // monthly specifics

      minimum_payment_amount: {
        type: FLOAT,
        defaultValue: 0,
      },
      minimum_payment_due_date: {
        type: DATE,
      },

      // billing types that are more secure as booleans
      is_hourly: {
        type: BOOLEAN,
      },
      is_flat_rate: {
        type: BOOLEAN,
      },
      is_monthly: {
        type: BOOLEAN,
      },
      is_contingency: {
        type: BOOLEAN,
      },
      is_insurance: {
        type: BOOLEAN,
      },
    },
    {
      tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    },
  );

  return MatterBillingSettings;
};
