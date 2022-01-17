
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT,
    FLOAT,
    DATE
  }) => {
    const tableName = 'legal_insurance';

    const LegalInsurance = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: INTEGER,
          allowNull: false,
        },
        firm_id: {
          type: INTEGER,
          allowNull: false,
        },
        matter_id: {
            type: INTEGER
        },
        policy_number: {
            type: STRING
        },
        policy_holder: {
            type: STRING
        },
        social_security: {
            type: INTEGER
        },
        company_name: {
            type: STRING
        }
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return LegalInsurance;
  };
