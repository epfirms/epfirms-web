
module.exports = (sequelize, {
  INTEGER,
  STRING,
}) => {
  const tableName = 'twilio_subaccount';

  const TwilioSubaccount = sequelize.define(
    tableName, {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firm_id: {
        type: INTEGER,
        allowNull: false,
      },
      account_sid: {
        type: STRING,
        allowNull: false,
      },
      auth_token: {
        type: STRING,
        allowNull: false,
      },
      api_key: {
        type: STRING,
        allowNull: false,
      },
      api_secret: {
        type: STRING,
        allowNull: false,
      },
      conversations_service: {
        type: STRING,
        allowNull: false
      }
    }, {
      tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      },
    },
  );

  return TwilioSubaccount;
};
