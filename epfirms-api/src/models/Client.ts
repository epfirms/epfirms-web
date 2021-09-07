
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN
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