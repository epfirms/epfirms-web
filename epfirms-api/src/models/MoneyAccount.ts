
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT
  }) => {
    const tableName = 'money_account';

    const MoneyAccount = sequelize.define(
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
        institution: {
            type: STRING
        },
        balance: {
          type: INTEGER
        },
        type: {
            type: STRING
        },
        is_joint: {
          type: BOOLEAN,
        },
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return MoneyAccount;
  };
