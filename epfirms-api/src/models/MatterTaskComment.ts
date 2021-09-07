
module.exports = (sequelize, {
    INTEGER,
    TEXT,
  }) => {
    const tableName = 'matter_task_comment';
  
    const MatterTaskComment = sequelize.define(
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
          text: {
            type: TEXT,
          },
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );
  
    return MatterTaskComment;
  };