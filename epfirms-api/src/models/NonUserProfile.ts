// THIS CLASS IS DESIGNED TO BE USED TO HOLD PERSONAL DATA OF A APPLICATION NON-USER
// EXAMPLES OF THIS WOULD BE: FamilyMember, Appointee,

module.exports = (sequelize, { STRING, INTEGER, DATEONLY, TEXT, VIRTUAL, BOOLEAN }) => {
  const tableName = 'non_user_profile';

  const NonUserProfile = sequelize.define(
    tableName,
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: STRING,
      },
      middle_name: {
        type: STRING,
      },
      last_name: {
        type: STRING,
      },
      preferred_name: {
        type: STRING,
      },
      dob: {
        type: DATEONLY,
      },
      gender: {
        type: STRING,
      },
      email: {
        type: STRING,
        unique: true,
      },
      phone: {
        type: STRING,
        unique: true,
      },
      cell_phone: {
        type: STRING,
        unique: true,
      },
      address: {
        type: STRING,
      },
      city: {
        type: STRING,
      },
      state: {
        type: STRING,
      },
      zip: {
        type: STRING,
      },
      county: {
        type: STRING,
      },
      profile_image: {
        type: TEXT,
      },
      full_name: {
        type: VIRTUAL,
      },
      ssn: {
        type: STRING,
      },
      drivers_id: {
        type: STRING,
      },
      note: {
        type: TEXT,
      },
      has_special_needs: {
        type: BOOLEAN,
      },

      

      is_minor: {
        type: BOOLEAN,
      },
    },
    {
      tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
      getterMethods: {
        full_name: function (this: typeof NonUserProfile) {
          return this.getDataValue('first_name') + ' ' + this.getDataValue('last_name');
        },
      },
    },
  );

  return NonUserProfile;
};
