module.exports = (sequelize, { INTEGER, STRING, BOOLEAN }) => {
  const tableName = 'task_template';

  const TaskTemplate = sequelize.define(
    tableName,
    {
      id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firm_id: {
            type: INTEGER,
        },
        legal_area: {
            type: STRING,
        },
        template_name: {
            type: STRING,
        },
    },
    {
      tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      },
    }
  );

  return TaskTemplate;
};
