
module.exports = (sequelize, {
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
        status: {
          type: STRING,
          defaultValue: 'sent',
        },
        uid: {
          type: STRING,
          required: true,
          unique: true
        }
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