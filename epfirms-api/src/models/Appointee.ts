
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT
  }) => {
    const tableName = 'appointee';

    const Appointee = sequelize.define(
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
        appointee_id: {
          type: INTEGER,
          allowNull: false
        },
        executor: {
          type: INTEGER
        },
        trustee: {
          type: INTEGER
        },
        dpoa: {
          type: INTEGER
        },
        mpoa: {
          type: INTEGER
        },
        gop: {
          type: INTEGER
        },
        goe: {
          type: INTEGER
        },
        gomc: {
          type: INTEGER
        }
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return Appointee;
  };
