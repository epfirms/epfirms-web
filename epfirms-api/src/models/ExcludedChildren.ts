
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT
  }) => {
    const tableName = 'excluded_children';

    const ExcludedChildren = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        // this is reference to the user that holds excluded child information
        user_id: {
          type: INTEGER,
          allowNull: false,
        },
        //reference to the specific matter
        matter_id: {
            type: INTEGER,
            allowNull: false
        },
      },{
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return ExcludedChildren;
  };
