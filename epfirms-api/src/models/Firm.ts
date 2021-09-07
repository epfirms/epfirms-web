
module.exports = (sequelize, {
    INTEGER,
    TEXT,
    STRING
  }) => {
    const tableName = 'firm';
  
    const Firm = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
            type: STRING,
          },
          phone: {
            type: STRING,
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
          description: {
            type: TEXT,
          },
          website_url: {
            type: TEXT,
          },
          firm_image: {
            type: TEXT,
          },
          google_review_url: {
            type: TEXT,
          }
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );
  
    return Firm;
  };