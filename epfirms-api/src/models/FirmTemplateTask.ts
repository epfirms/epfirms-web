module.exports = (sequelize, { INTEGER, STRING }) => {
  const tableName = 'firm_template_task';

  const FirmTemplateTask = sequelize.define(
    tableName,
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      template_id: {
        type: INTEGER
      },
      user_id: {
        type: INTEGER
      },
      name: {
        type: STRING
      },
      no_of_days_from_start_date: {
        type: INTEGER
      },
      duration_minutes: {
        type: INTEGER
      },
      firm_role_id: {
        type: INTEGER
      }
    },
    {
      tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
    }
  );

  return FirmTemplateTask;
};
