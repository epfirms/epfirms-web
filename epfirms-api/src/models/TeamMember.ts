import { DataTypes } from 'sequelize';

module.exports = (sequelize) => {
  const tableName = 'team_member';

  const teamMember = sequelize.define(
    tableName,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      team_id: {
        type: DataTypes.INTEGER,
      },
      firm_employee_id: {
        type: DataTypes.INTEGER,
      },
      role: {
        type: DataTypes.ENUM,
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
      include_in_group_chat: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      tableName: tableName,
      modelName: tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
      indexes: [{ unique: true, fields: ['team_id', 'role'] }],
    },
  );

  return teamMember;
};
