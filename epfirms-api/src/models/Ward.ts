
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT
  }) => {
    const tableName = 'ward';

    const Ward = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        // this is a reference to the ward information
        user_id: {
          type: INTEGER,
        },
       // this is a reference to the specific matter
        matter_id: {
            type: INTEGER,
        },

        // this is the user id for the caregiver who holds/manages the case
        caregiver_id: {
            type: INTEGER,
        },

     }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return Ward;
  };
