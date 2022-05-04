
module.exports = (sequelize, {
    INTEGER,
    STRING,
    BOOLEAN,
  }) => {
    const tableName = 'referral';
  
    const Referral = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        matter_id: {
          type: INTEGER,
          allowNull: false,
        },
        date: {
            type: STRING,
            allowNull: false,
        },
        friend_or_family: {
            type: BOOLEAN,
            defaultValue: false,
        },
        professional: {
            type: BOOLEAN,
            defaultValue: false,
        },
        referral_name: {
            type: STRING,
        },
        google: {
            type: BOOLEAN,
            defaultValue: false,
        },
        bing: {
            type: BOOLEAN,
            defaultValue: false,
        },
        other_search_engine: {
            type: BOOLEAN,
            defaultValue: false,
        },
        facebook: {
            type: BOOLEAN,
            defaultValue: false,
        },
        twitter: {
            type: BOOLEAN,
            defaultValue: false,
        },
        other_social_media: {
            type: BOOLEAN,
            defaultValue: false,
        },
        aarag: {
            type: BOOLEAN,
            defaultValue: false,
        },
        metlegal: {
            type: BOOLEAN,
            defaultValue: false,
        },
        other_legal_insurance: {
            type: BOOLEAN,
            defaultValue: false,
        },
        other: {
            type: BOOLEAN,
            defaultValue: false,
        }

      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );
  
    return Referral;
  }