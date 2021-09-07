
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT
  }) => {
    const tableName = 'vehicle';

    const Vehicle = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        vehicle_type: {
            type: STRING
        },
        total_value: {
            type: INTEGER
        },
        loan_amount: {
            type: INTEGER
        },
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return Vehicle;
  };
