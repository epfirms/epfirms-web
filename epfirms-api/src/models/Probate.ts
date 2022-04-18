
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT
  }) => {
    const tableName = 'probate';

    const Probate = sequelize.define(
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
       // this is a reference to the specific matter
        matter_id: {
            type: INTEGER,
            allowNull: false
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
        personal_representative_id: {
            type: INTEGER,
        },
        alternative_representative_id: {
            type: INTEGER,
        },

     }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return Probate;
  };
