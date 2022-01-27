
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
        matter_id: {
            type: INTEGER,
            unique: true,
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
            type: INTEGER
        },
        apply_late_fee: {
            type: BOOLEAN
        },
        grace_period: {
            type: INTEGER
        },
        late_fee_amount: {
            type: FLOAT
        },
        subscription_id : {
          type: STRING,
        },
        stripe_session_id : {
          type: STRING
        },
        subscription_active : {
          type: BOOLEAN,
          defaultValue: false
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
