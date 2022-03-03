
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT,
    FLOAT,
    DATE, 
    JSON
  }) => {
    const tableName = 'contract_template';

    const ContractTemplate = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        firm_id: {
          type: INTEGER,
          allowNull: false,
        },
        matter_id: {
            type: INTEGER,
        },
        title: {
            type: STRING
        },
        // the actual content of the template; it should be json generated
        // by quill js
        content: {
            type: JSON
        },
        // some properties for sharing in the future
        public: {
            type: BOOLEAN,
            defaultValue: false
        },
        // some properties for sharing in the future
        rating: {
            type: INTEGER,
            defaultValue: 0
        },
        template_vars: {
            type: STRING
        }

        
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return ContractTemplate;
  };
