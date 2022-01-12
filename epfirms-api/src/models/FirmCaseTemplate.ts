module.exports = (sequelize, { INTEGER, STRING, BOOLEAN }) => {
    const tableName = 'firm_case_template';
  
    const FirmCaseTemplate = sequelize.define(
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
          law_category: {
            type: STRING
          },
          state_category: {
            type: STRING
          }
      },
      {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      }
    );
  
    return FirmCaseTemplate;
  };
  