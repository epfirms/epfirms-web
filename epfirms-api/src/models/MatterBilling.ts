module.exports = (sequelize, { INTEGER, DATE, DECIMAL, STRING }) => {
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
            type: DECIMAL(15, 2),
          },
          date: {
            type: DATE,
          },
          hours: {
            type: INTEGER
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
            type: DECIMAL(15, 2),
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
            type: DECIMAL(15, 2),
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
