
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT
  }) => {
    const tableName = 'appointee';

    const Appointee = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        // this is a reference to the User object that holds the appointee information
        user_id: {
          type: INTEGER,
          allowNull: false,
        },
        //this is the id of the user that appointed the appointee
        // for example: Joe appoints John to be his Executor. 
        // this would make Joe the Appointor and John the Appointee
        // legal stuff fun fun :) 
        appointor_id: {
          type: INTEGER,
          allowNull: false
        },
        executor: {
          type: BOOLEAN
        },
        trustee: {
          type: BOOLEAN
        },
        // durable power of attorney
        dpoa: {
          type: BOOLEAN
        },
        // medical power of attorney
        mpoa: {
          type: BOOLEAN
        },
        gop: {
          type: BOOLEAN
        },
        goe: {
          type: BOOLEAN
        },
        //guardian of minor children
        gomc: {
          type: BOOLEAN
        }
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return Appointee;
  };
