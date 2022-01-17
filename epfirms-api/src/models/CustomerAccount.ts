
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT,
    FLOAT,
    DATE
  }) => {
    const tableName = 'customer_account';

    const CustomerAccount = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: INTEGER,
          allowNull: false,
        },
        firm_id: {
          type: INTEGER,
          allowNull: false,
        },
        balance: {
            type: FLOAT
        },
        last_payment: {
            type: FLOAT
        },
        last_payment_date: {
            type: DATE
        },
        payment_agreement: {
            type: BOOLEAN
        },
        min_payment: {
            type: FLOAT
        },
        due_date: {
            type: DATE
        },
        apply_late_fee: {
            type: BOOLEAN
        },
        grace_period: {
            type: INTEGER
        },
        late_fee_amount: {
            type: FLOAT
        }
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return CustomerAccount;
  };
