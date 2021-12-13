module.exports = (sequelize, { INTEGER }) => {
    const tableName = 'firm_employee_role';
  
    const FirmEmployeeRole = sequelize.define(
      tableName,
      {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        firm_employee_id: {
          type: INTEGER
        },
        firm_role_id: {
          type: INTEGER
        }
      },
      {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      }
    );
  
    return FirmEmployeeRole;
  };
  