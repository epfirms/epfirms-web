
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
        // this is a reference to the User object that holds the appointor information
        user_id: {
          type: INTEGER,
          allowNull: false,
        },
        // this is a reference to the appointee's user table info
        appointee_id: {
          type: INTEGER,
          allowNull: false
        },
        type: {
          type: STRING
        },
        rank : {
          type: INTEGER
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
