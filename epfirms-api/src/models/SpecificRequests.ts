
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT
  }) => {
    const tableName = 'specific_requests';

    const SpecificRequests = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      //  // the reference to the primary benficiary
      //  // this will be a reference to the user table
      //  beneficiary_id: {
      //       type: INTEGER,
      //       allowNull: false
      //   },
      //   //this will be a reference to the user table
      //   // reference to contingent beneficiary
      //   contingent_beneficiary_id: {
      //       type: INTEGER,
      //       allowNull: false
      //   },
        beneficiary_name: {
            type: STRING,
        },
        contingent_beneficiary_name: {

            type: STRING,
        },
        // name of the item or request
        item_name: {
            type: STRING,
        },
        // defer until spouse has deceased?
        defer_until_spouse_deceased: {
            type: BOOLEAN,
        },
        //reference to the specific matter
        matter_id: {
            type: INTEGER,
            allowNull: false
        },
      },{
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return SpecificRequests;
  };
