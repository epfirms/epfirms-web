module.exports = (sequelize, { INTEGER, BOOLEAN }) => {
    const tableName = 'firm_team_member';
  
    const FirmTeamMember = sequelize.define(
      tableName,
      {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        firm_team_id: {
          type: INTEGER
        },
        firm_employee_id: {
          type: INTEGER
        },
        firm_role_id: {
          type: INTEGER
        },
        include_in_group_chat: {
          type: BOOLEAN,
          defaultValue: false,
          allowNull: false,
        }
      },
      {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      }
    );
  
    return FirmTeamMember;
  };
  