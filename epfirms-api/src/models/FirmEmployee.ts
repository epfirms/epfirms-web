
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN
  }) => {
    const tableName = 'firm_employee';
  
    const FirmEmployee = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firm_id: {
          type: INTEGER
        },
        user_id: {
          type: INTEGER
        },
        admin: {
            type: BOOLEAN,
          },
          attorney: {
            type: BOOLEAN,
          },
          legal_assistant: {
            type: BOOLEAN,
          },
          paralegal: {
            type: BOOLEAN,
          },
          active: {
            type: BOOLEAN,
            defaultValue: true
          }
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        // hooks: {
        //   beforeUpdate() {}
        // }
      },
    );
  
    return FirmEmployee;
  };