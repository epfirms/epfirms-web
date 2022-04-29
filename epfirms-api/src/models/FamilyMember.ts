
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT
  }) => {
    const tableName = 'family_member';

    const FamilyMember = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        relationship_type: {
            type: STRING,
            allowNull: false
        },
        // these are children specific properties
        // they might need to refactored into a better table later but for now
        // this was the easiest place to keep them
        is_minor: {
          type: BOOLEAN,
        },
        


      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return FamilyMember;
  };
