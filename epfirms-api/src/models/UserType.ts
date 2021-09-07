
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN
  }) => {
    const tableName = 'user_type';
  
    const UserType = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: INTEGER
        },
        client: {
          type: BOOLEAN,
        },
        firm: {
            type: BOOLEAN
        }
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );
  
    return UserType;
  };