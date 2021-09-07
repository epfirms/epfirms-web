
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT
  }) => {
    const tableName = 'matter_activity';

    const MatterActivity = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: INTEGER,
          allowNull: false,
        },
        feature: {
          type: STRING,
          allowNull: false,
        },
        matter_id: {
          type: INTEGER,
          allowNull: true,
        },
        action: {
          type: STRING,
          allowNull: false,
        },
        value: {
          type: STRING,
        },
        staff_name: {
          type: STRING,
        }
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return MatterActivity;
  };
