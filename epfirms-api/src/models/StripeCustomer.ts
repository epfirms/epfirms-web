module.exports = (sequelize, { INTEGER, STRING }) => {
  const tableName = 'stripe_customer';

  const StripeCustomer = sequelize.define(
    tableName,
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firm_id: {
        type: INTEGER,
        allowNull: false,
      },
      customer_id: {
        type: STRING,
        allowNull: false,
      },
    },
    {
      tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    },
  );

  return StripeCustomer;
};
