
module.exports = (sequelize, {
    INTEGER,
    STRING,
    TEXT,
    FLOAT
  }) => {
    const tableName = 'income';
  
    const Income = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id : {
            type: INTEGER,
            allowNull : false,
        },
        type: {
            type: STRING,
        },
        amount: {
            type: FLOAT
        } 
      }, {
        tableName
      },
    );
  
    return Income;
  }