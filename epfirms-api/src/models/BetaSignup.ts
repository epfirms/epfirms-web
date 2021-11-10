module.exports = (sequelize, { INTEGER, STRING }) => {
  const tableName = 'beta_signup';

  const BetaSignup = sequelize.define(
    tableName,
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firm_name: {
        type: STRING,
        allowNull: false
      },
      first_name: {
        type: STRING,
        allowNull: false
      },
      last_name: {
        type: STRING,
        allowNull: false
      },
      email: {
        type: STRING,
        allowNull: false
      },
      phone: {
        type: STRING,
        allowNull: false
      }
    },
    {
      tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
    }
  );

  return BetaSignup;
};
