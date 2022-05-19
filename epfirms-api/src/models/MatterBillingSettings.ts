
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT,
    JSON,
    FLOAT,
    DATE
  }) => {
    const tableName = 'matter_billing_settings';

    const MatterBillingSettings = sequelize.define(
      tableName, {
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
          defaultValue: 'hourly'
        },
        payment_type: {
          type: STRING,
          defaultValue: 'private pay'
        },
        
        
        contingency_percent: {
          type: FLOAT
        },
        // flat rate specifics

        flat_rate_amount: {
          type: FLOAT
        },
        split_flat_rate: {
          type: BOOLEAN
        },
        initial_payment: {
          type: FLOAT
        },
        final_payment: {
          type: FLOAT
        },
        final_payment_due_date: {
          type: DATE
        },
        initial_invoice_message: {
          type: TEXT
        },
        final_invoice_message: {
          type: TEXT
        },
        // hourly specifics
        retainer_amount: {
          type: FLOAT
        },
        retainer_invoice_message: {
          type: TEXT
        },

        //contingency specifics
        // settlement amounts are percents
        //appeal amount is also percent
        before_settlement: {
          type: FLOAT
        },
        after_settlement: {
          type: FLOAT
        },
        settlement_date: {
          type: DATE
        },
        appeal_amount: {
          type: FLOAT
        },

        // insurance specifics
        company_name: {
          type: STRING
        },
        policy_holder_name: {
          type: STRING
        },
        policy_number: {
          type: STRING
        },
        claim_number: {
          type: STRING
        },
        insurance_notes: {
          type: TEXT
        },

        // monthly specifics

        minimum_payment_amount: {
          type: FLOAT
        },
        minimum_payment_due_date: {
          type: DATE
        },

        // billing types that are more secure as booleans
        is_hourly: {
          type: BOOLEAN
        },
        is_flat_rate: {
          type: BOOLEAN
        },
        is_monthly: {
          type: BOOLEAN
        },
        is_contingency: {
          type: BOOLEAN
        },
        is_insurance: {
          type: BOOLEAN
        },



      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return MatterBillingSettings;
  };
