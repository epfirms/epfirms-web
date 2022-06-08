module.exports = (sequelize, { INTEGER, BOOLEAN, DECIMAL, ENUM }) => {
  const tableName = 'firm_employee';

  const FirmEmployee = sequelize.define(
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
      user_id: {
        type: INTEGER,
      },
      admin: {
        type: BOOLEAN,
      },
      active: {
        type: BOOLEAN,
        defaultValue: true,
      },
      hourly_rate: {
        type: DECIMAL,
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
      },
    },
    {
      tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
      // hooks: {
      //   beforeUpdate() {}
      // }
    },
  );

  return FirmEmployee;
};
