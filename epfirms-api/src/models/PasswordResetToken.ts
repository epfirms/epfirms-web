module.exports = (sequelize, { INTEGER, STRING }) => {
  const tableName = 'password_reset_token';

  const PasswordResetToken = sequelize.define(
    tableName,
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: INTEGER
      },
      token: {
        type: STRING
      }
    },
    {
      tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
    }
  );

  return PasswordResetToken;
};
