
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN, 
    FLOAT
  }) => {
    const tableName = 'client';
  
    const Client = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        active: {
          type: BOOLEAN,
          defaultValue: true
        },
        iolta_balance: {
          type: FLOAT
        }
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );
  
    return Client;
  };