module.exports = (sequelize, {
    STRING,
    INTEGER
  }) => {
    const tableName = 'verification_token';
  
    const verification_token = sequelize.define(
      tableName, {
        user_id: {
          type: INTEGER,
          primaryKey: true
        },
        token: {
          type: STRING,
        }
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );
  
    return verification_token;
  };