
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT
  }) => {
    const tableName = 'decedent';

    const Decedent = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        // this is a reference to the decendent information
        user_id: {
          type: INTEGER,
        },
       // this is a reference to the specific matter
        matter_id: {
            type: INTEGER,
        },

        date_of_birth: {
          type: STRING,
        },
        
        place_of_birth: {
            type: STRING,
        },
        date_of_death: {
            type: STRING,
        },
        place_of_death: {
            type: STRING,
        },
        us_citizen: {
            type: BOOLEAN,
        },
        naturalized_citizen: {
            type: BOOLEAN,
        },
        date_of_naturalization: {
            type: STRING,
        },
        place_of_naturalization: {
            type: STRING,
        },
        date_of_will: {
            type: STRING,
        },
        date_of_codicils: {
            type: STRING,
        },
        // this is the user id for the person who holds/manages the case
        personal_representative_id: {
            type: INTEGER,
        },
        alternative_representative_id: {
            type: INTEGER,
        },
        notes: {

            type: TEXT,
        },

     }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return Decedent;
  };
