
module.exports = (sequelize, {
    INTEGER,
    STRING,
    TEXT,
    FLOAT,
  }) => {
    const tableName = 'decedent_property';

    const DecedentProperty = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        user_id: {
          type: INTEGER,
          allowNull: false,
        },
        matter_id: {
            type: INTEGER,
        },
        decedent_id: {
            type: INTEGER,
        },
        value: {
            type: FLOAT,
            defaultValue: 0,
        },
        name: {
            type: STRING,
            defaultValue: '',
        },
        beneficiary: {
            type: STRING,
            defaultValue: '',
        },
        note: {
            type: TEXT,
            defaultValue: '',
        }
        
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return DecedentProperty;
  };
