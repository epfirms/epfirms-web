module.exports = (sequelize, { INTEGER, STRING }) => {
    const tableName = 'firm_role';
  
    const FirmRole = sequelize.define(
      tableName,
      {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: STRING
        },
        firm_id: {
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
  
    return FirmRole;
  };
  