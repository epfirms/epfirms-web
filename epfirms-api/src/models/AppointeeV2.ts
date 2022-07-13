module.exports = (sequelize, { INTEGER, BOOLEAN }) => {
  const tableName = 'appointeev2';

  const AppointeeV2 = sequelize.define(
    tableName,
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      matter_id: {
        type: INTEGER,
        allowNull: false,
      },
      // this is a reference to the User object that holds the appointee information
      non_user_profile_id: {
        type: INTEGER,
        allowNull: false,
      },
      // this is a reference to the appointer's user table info
      appointer_id: {
        type: INTEGER,
        allowNull: false,
      },

      // booleans that determine the type of appointee
      // an appointee can be multiple types
      is_executor: {
        type: BOOLEAN,
        defaultValue: false,
      },

      is_trustee: {
        type: BOOLEAN,
        defaultValue: false,
      },
      is_fpoa: {
        type: BOOLEAN,
        defaultValue: false,
      },
      is_mpoa: {
        type: BOOLEAN,
        defaultValue: false,
      },
      is_gom: {
        type: BOOLEAN,
        defaultValue: false,
      },
      is_gop: {
        type: BOOLEAN,
        defaultValue: false,
      },
      is_goe: {
        type: BOOLEAN,
        defaultValue: false,
      },
      // rank determines the priority in the appointment when compared to other appointees.
      executor_rank: {
        type: INTEGER,
      },
      trustee_rank: {
        type: INTEGER,
      },
      fpoa_rank: {
        type: INTEGER,
      },
      mpoa_rank: {
        type: INTEGER,
      },
      gop_rank: {
        type: INTEGER,
      },
      gom_rank: {
        type: INTEGER,
      },
      goe_rank: {
        type: INTEGER,
      },
    },
    {
      tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    },
  );

  return AppointeeV2;
};
