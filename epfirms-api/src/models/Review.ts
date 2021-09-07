
module.exports = (sequelize, {
    BOOLEAN,
    INTEGER,
    STRING
  }) => {
    const tableName = 'review';
  
    const review = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        matter_id: {
          type: INTEGER,
        },
        rating: {
          type: INTEGER,
        },
        comment: {
          type: STRING,
        },
        is_sent: {
          type: BOOLEAN,
          default: false,
        },
        is_done: {
          type: BOOLEAN,
          default: false,
        },
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        // hooks: {
        //   beforeUpdate() {}
        // }
      },
    );
  
    return review;
  };