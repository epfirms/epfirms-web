module.exports = (sequelize, { INTEGER, STRING, TEXT }) => {
  const tableName = 'firm_template_task_sms_message';

  const FirmTemplateTaskSMS = sequelize.define(
    tableName,
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      body: {
        type: STRING
      },
    },
    {
      tableName,
      modelName: tableName,
      freezeTableName: true,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
    }
  );

  return FirmTemplateTaskSMS;
};
