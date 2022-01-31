module.exports = (sequelize, { INTEGER, DATE, BOOLEAN, FLOAT, STRING }) => {
    const tableName = 'matter_billing';

    const MatterBilling = sequelize.define(
      tableName,
      {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          matter_id: {
            type: INTEGER,
          },
          type: {
            type: STRING,
          },
          amount: {
            type: FLOAT,
          },
          date: {
            type: DATE,
          },
          hours: {
            type: FLOAT
          },
          description: {
            type: STRING,
          },
          billing_type: {
            type: STRING,
          },
          payment_type: {
            type: STRING,
          },
          hourly_rate: {
            type: FLOAT,
          },
          track_time_for: {
            type: INTEGER,
          },
          start_date: {
            type: DATE
          },
          end_date: {
            type: DATE
          },
          start_time: {
            type: STRING,
          },
          end_time: {
            type: STRING,
          },
          settlement_percentage: {
            type: INTEGER,
          },
          settlement_amount: {
            type: FLOAT,
          },
          statement_id: {
            type: INTEGER
          },
          employee_name: {
            type: STRING
          },
          reconciled: {
            type: BOOLEAN,
            defaultValue: false
          },
          waive: {
            type: BOOLEAN,
            defaultValue: false
          }
      },
      {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      }
    );

    return MatterBilling;
  };
