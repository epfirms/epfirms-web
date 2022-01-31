
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
        before_settlement: {
          type: FLOAT
        },
        after_settlement: {
          type: FLOAT
        },
        settlement_date: {
          type: DATE
        }
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return MatterBillingSettings;
  };
