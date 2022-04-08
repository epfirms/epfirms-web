module.exports = (sequelize, { INTEGER, STRING, BOOLEAN }) => {
    const tableName = 'matter_intake';
  
    const MatterIntake = sequelize.define(
      tableName,
      {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        matter_id: {
          type: INTEGER
        },
        status: {
          type: STRING
        },
        type: {
          type: STRING
        },
        sent_by: {
          type: INTEGER
        }
      },
      {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      }
    );
  
    return MatterIntake;
  };
  