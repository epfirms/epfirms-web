module.exports = (sequelize, { INTEGER, STRING, BOOLEAN, FLOAT }) => {
  const tableName = 'matter';

  const Matter = sequelize.define(
    tableName,
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: STRING,
      },
      case_id: {
        type: STRING
      },
      status: {
        type: STRING
      },
      legal_area_id: {
        type: INTEGER
      },
      matter_type: {
        type: STRING
      },
      firm_id: {
        type: INTEGER
      },
      client_id: {
        type: INTEGER
      },
      spouse_id: {
        type: INTEGER
      },
      attorney_id: {
        type: INTEGER
      },
      point_of_contact_id: {
        type: INTEGER
      },
      opposing_counsel_id: {
        type: INTEGER
      },
      matter_intake_id: {
        type: INTEGER
      },
      deleted: {
        type: BOOLEAN,
        defaultValue: false
      },
      iolta_balance: {
        type: FLOAT
      },
      billing_setup : {
        type: BOOLEAN,
        defaultValue: false
      }
    },
    {
      tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      },
    }
  );

  return Matter;
};
