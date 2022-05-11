module.exports = (sequelize, { INTEGER, STRING, ENUM }) => {
  const tableName = 'community_template_task';

  const CommunityTemplateTask = sequelize.define(
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
      name: {
        type: STRING
      },
      no_of_days_from_start_date: {
        type: INTEGER
      },
      duration_minutes: {
        type: INTEGER
      },
      role: {
        type: ENUM,
        values: [
          'attorney',
          'associate attorney',
          'paralegal',
          'legal assistant',
          'receptionist',
          'office manager',
          'other',
        ],
      }
    },
    {
      tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
    }
  );

  return CommunityTemplateTask;
};
