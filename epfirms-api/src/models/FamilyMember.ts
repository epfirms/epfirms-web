
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
        // this is the id of the user who is the client
        user_id: {

            type: INTEGER,
            allowNull: false
        },
        // this is the id of the family member's entry on the user table
        family_member_id: {

            type: INTEGER,
            allowNull: false
        },

        // these are children specific properties
        // they might need to refactored into a better table later but for now
        // this was the easiest place to keep them
        is_minor: {
          type: BOOLEAN,
        },
        has_special_needs: {
          type: BOOLEAN,
        },
        parent_1_name: {
          type: STRING,
        },
        parent_1_id: {
          type: INTEGER,
        },
        parent_2_name: {
          type: STRING,
        },
        parent_2_id: {
          type: INTEGER,
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
