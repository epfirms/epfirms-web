
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT
  }) => {
    const tableName = 'stripe_account';

    const StripeAccount = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firm_id: {
          type: INTEGER,
          allowNull: false,
        },
        account_id: {
          type: STRING,
          allowNull: false,
        }
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return StripeAccount;
  };
