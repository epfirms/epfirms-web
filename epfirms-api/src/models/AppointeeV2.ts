
module.exports = (sequelize, {
    INTEGER,
    ENUM,
  }) => {
    const tableName = 'appointeev2';

    const AppointeeV2 = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        // this is a reference to the User object that holds the appointee information
        non_user_profile_id: {
          type: INTEGER,
          allowNull: false,
        },
        // this is a reference to the appointer's user table info
        appointer_id: {
          type: INTEGER,
          allowNull: false
        },
        // these are the basic emumerations used for the appointee type
        // the likely will be added to in the future
        type: {
          type: ENUM,
            values: [
                'executor',
                'trustee',
                //financial power of attorney
                'fpoa',
                // medical power of attorney
                'mpoa',
                // guardian of estate
                'goe',
                // guardian of person
                'gop',
                //guardian of minor
                'gom',
            ],
        },
        // ranking of the appointee compared to the others listed
        rank : {
          type: INTEGER
        }
     }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return AppointeeV2;
  };
