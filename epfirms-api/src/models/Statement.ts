
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT,
    DATE,
    FLOAT
  }) => {
    const tableName = 'statement';

    const Statement = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: INTEGER,

        },
        invoice_number: {
          type: INTEGER,
        },
        firm_id: {
          type: INTEGER,
          allowNull: false,
        },
        status: {
          type: STRING,

        },
        matter_id: {
          type: INTEGER,
          allowNull: false,
        },
        terms: {
          type: STRING,

        },
        due_date: {
          type: STRING,
          allowNull: false,
        },
        invoice_date: {
          type: STRING,

        },
        tags: {
          type: STRING,
        },
        message: {
          type: STRING,
        },
        statement_message: {
          type: STRING,
        },
        balance_due: {
          type: FLOAT,
        },
        total: {
          type: INTEGER,
        },
        stripe_session_id: {
          type: STRING
        },
        is_approved: {
          type: BOOLEAN,
          defaultValue: 0
        },
        is_client_visible: {
          type: BOOLEAN,
          defaultValue: 0
        }
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return Statement;
  };
