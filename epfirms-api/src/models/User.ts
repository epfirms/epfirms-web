module.exports = (sequelize, { STRING, INTEGER, DATEONLY, TEXT, VIRTUAL, TINYINT, BOOLEAN }) => {
  const tableName = 'user';

  const User = sequelize.define(
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
      password: {
        type: STRING,
      },
      profile_image: {
        type: TEXT,
      },
      full_name: {
        type: VIRTUAL,
      },
      verified: {
        type: TINYINT,
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
      is_minor: {
        type: BOOLEAN,
      },
    },
    {
      tableName,
      defaultScope: {
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      },
      getterMethods: {
        full_name: function (this: typeof User) {
          return this.getDataValue('first_name') + ' ' + this.getDataValue('last_name');
        },
      },
    },
  );

  return User;
};
