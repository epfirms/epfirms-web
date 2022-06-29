
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT,
    DATE,
    FLOAT
  }) => {
    const tableName = 'transaction';

    const Transaction = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        // user of the application that created it
        user_id: {
          type: INTEGER,
          allowNull: false,

        },
        // client that the transaction is for
        client_id: {
            type: INTEGER,
            allowNull: false,
        },
        firm_id: {
            type: INTEGER,
            allowNull: false,
        },
        matter_id: {
            type: INTEGER,
            allowNull: false,
        },
        // related invoice 
        invoice_id: {
            type: INTEGER,
        },
        hours: {
            type: FLOAT,
            defaultValue: 0
        },
        // type : 'payment' 'bill'
        type: {
            type: STRING,
            defaultValue: 'bill'
        },
        description: {
            type: STRING,
        },
        value: {
            type: FLOAT,
            defaultValue: 0
        },
        waived: {
            type: BOOLEAN,
            defaultValue: false
        },
        stripe_invoice_id: {
            type: STRING,
        },
        stripe_invoice_item_id: {
            type: STRING,
        },


        
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return Transaction;
  };
