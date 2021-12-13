
module.exports = (sequelize, {
    INTEGER,
    TEXT,
    JSON
  }) => {
    const tableName = 'matter_note';
  
    const MatterNote = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        matter_id: {
          type: INTEGER
        },
        user_id: {
          type: INTEGER
        },
        note_string: {
          type: TEXT
        },
        content: {
          type: JSON
        }
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        // hooks: {
        //   beforeUpdate() {}
        // }
      },
    );
  
    return MatterNote;
  };