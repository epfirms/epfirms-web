import { DataTypes } from 'sequelize';

module.exports = (sequelize) => {
  const tableName = 'team';

  const team = sequelize.define(
    tableName,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      twilio_phone_number: {
        type: DataTypes.STRING,
        unique: true,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      tableName: 'team',
      modelName: 'team',
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    },
  );

  return team;
};
