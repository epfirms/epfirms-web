
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    DATE
  }) => {
    const tableName = 'matter_task_assignee';
  
    const MatterTaskAssignee = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        matter_task_id: {
            type: INTEGER,
          },
          user_id: {
            type: INTEGER,
          },
          role: {
            type: STRING,
          },
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );
  
    return MatterTaskAssignee;
  };