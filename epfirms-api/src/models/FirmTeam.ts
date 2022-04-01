module.exports = (sequelize, { INTEGER, STRING }) => {
  const tableName = 'firm_team';

  const FirmTeam = sequelize.define(
    tableName,
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firm_id: {
        type: INTEGER
      },
      owner: {
        type: INTEGER
      },
      name: {
        type: STRING
      },
      twilio_phone_number: {
        type: STRING,
        unique: true,
      },
    },
    {
      tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
    }
  );

  return FirmTeam;
};
