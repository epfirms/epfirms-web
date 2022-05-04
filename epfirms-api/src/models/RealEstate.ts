
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT
  }) => {
    const tableName = 'real_estate';

    const RealEstate = sequelize.define(
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
        total_value: {
          type: INTEGER,
          defaultValue: 0,
        },
        loan_amount: {
            type: INTEGER,
            defaultValue: 0,
        },
        full_address: {
            type: STRING,
        },
        is_business : {
          type: BOOLEAN
        },
        has_mineral_rights : {
          type : BOOLEAN,
        }, 
        primary_residence : {
          type : BOOLEAN,
          defaultValue: false,
        }
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return RealEstate;
  };
