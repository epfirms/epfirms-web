module.exports = (sequelize, { INTEGER, BOOLEAN, STRING }) => {
  const tableName = 'matter_role';

  const MatterRole = sequelize.define(
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
      matter_id: {
        type: INTEGER
      },
      role: {
        type: STRING,
      },
      attorney: {
        type: BOOLEAN,
        defaultValue: false
      },
      partner: {
        type: BOOLEAN,
        defaultValue: false
      },
      client: {
        type: BOOLEAN,
        defaultValue: false
      },
      point_of_contact: {
        type: BOOLEAN,
        defaultValue: false
      },
      opposing_counsel: {
        type: BOOLEAN,
        defaultValue: false
      }
    },
    {
      tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
    }
  );

  return MatterRole;
};
