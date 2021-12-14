module.exports = (sequelize, { INTEGER, STRING }) => {
  const tableName = 'community_case_template';

  const CommunityCaseTemplate = sequelize.define(
    tableName,
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      legal_area: {
        type: STRING
      },
      template_name: {
        type: STRING
      },
      law_category: {
        type: STRING
      },
      state_category: {
        type: STRING
      },
      download_count: {
        type: INTEGER
      },
      rating: {
        type: INTEGER
      },
      created_by: {
        type: INTEGER
      },
    },
    {
      tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
    }
  );

  return CommunityCaseTemplate;
};
