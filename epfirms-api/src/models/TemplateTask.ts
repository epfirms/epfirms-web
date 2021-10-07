module.exports = (sequelize, { INTEGER, STRING, BOOLEAN }) => {
  const tableName = 'template_task';

  const TemplateTask = sequelize.define(
    tableName,
    {
      id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        template_id: {
            type: INTEGER,
        },
        user_id: {
            type: INTEGER,
        },
        task_description: {
            type: STRING,
        },
        no_of_days_from_start_date: {
            type: INTEGER,
        },
    },
    {
      tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      },
    }
  );

  return TemplateTask;
};
