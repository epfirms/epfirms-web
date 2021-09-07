
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT
  }) => {
    const tableName = 'document';

    const Document = sequelize.define(
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
        doc_name: {
          type: STRING,
          allowNull: false,
        },
        matter_id: {
          type: INTEGER,
          allowNull: true,
        },
        doc_type: {
          type: STRING,
          allowNull: false,
        },
        doc_key: {
          type: STRING,
          allowNull: false,
        },
        aws_link: {
          type: TEXT,
          allowNull: false,
        },
        share_with: {
          type: STRING,
          allowNull: false,
        },
        email_to_appointees: {
          type: BOOLEAN,
        },
        client_upload: {
          type: BOOLEAN,
        },
        firm_id: {
          type: INTEGER,
          allowNull: false,
        }
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return Document;
  };
