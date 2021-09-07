
module.exports = (sequelize, {
    INTEGER,
    STRING,
    TEXT
  }) => {
    const tableName = 'legal_area';
  
    const LegalArea = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: STRING
        },
        description: {
            type: TEXT
        },
        color: {
            type: STRING
        },
        firm_id: {
          type: INTEGER
        }
      }, {
        tableName
      },
    );
  
    return LegalArea;
  };