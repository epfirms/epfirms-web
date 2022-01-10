
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT,
    JSON
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
          defaultValue: 'Hourly'
        },
        payment_type: {
          type: STRING,
          defaultValue: 'Private Pay'
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
