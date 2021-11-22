module.exports = (sequelize, { INTEGER, STRING, TEXT }) => {
    const tableName = 'matter_task_file';
  
    const MatterTaskFile = sequelize.define(
      tableName,
      {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: STRING
        },
        key: {
          type: STRING
        },
        description: {
          type: TEXT
        }
      },
      {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      }
    );
  
    return MatterTaskFile;
  };
  