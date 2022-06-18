module.exports = (sequelize, { INTEGER, STRING, TEXT }) => {
  const tableName = 'community_template_task_sms_message';

  const CommunityTemplateTaskSMS = sequelize.define(
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

  return CommunityTemplateTaskSMS;
};
