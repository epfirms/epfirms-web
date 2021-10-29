module.exports = (sequelize, { INTEGER, STRING, TEXT }) => {
  const tableName = 'external_lead';

  const ExternalLead = sequelize.define(
    tableName,
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: STRING
      },
      middle_name: {
        type: STRING
      },
      last_name: {
        type: STRING
      },
      email: {
        type: STRING,
        unique: true
      },
      phone: {
        type: STRING
      },
      message: {
          type: TEXT
      }
    },
    {
      tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
    }
  );

  return ExternalLead;
};
