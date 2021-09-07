
module.exports = (sequelize, {
    INTEGER,
    STRING,
    DATEONLY,
    BOOLEAN
  }) => {
    const tableName = 'firm_subscription';
  
    const FirmSubscription = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        customer_id: {
          type: STRING
        },
        firm_id: {
          type: INTEGER
        },
        current_period_end: {
          type: DATEONLY
        }
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );
  
    return FirmSubscription;
  };