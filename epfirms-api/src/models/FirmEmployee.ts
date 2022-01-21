
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    DECIMAL
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
          active: {
            type: BOOLEAN,
            defaultValue: true
          },
          hourly_rate: {
            type: DECIMAL
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
