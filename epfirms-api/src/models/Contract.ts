module.exports = (sequelize, { INTEGER, BOOLEAN, STRING, TEXT, FLOAT, DATE }) => {
  const tableName = 'contract';

  const Contract = sequelize.define(
    tableName,
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: INTEGER,
        allowNull: false,
      },
      matter_id: {
        type: INTEGER,
        
        unique: true
      },
      attorney_id: {
        type: INTEGER,
        allowNull: false,
        
      },
      county: {
        type: STRING,
        allowNull: false,
      },
      state: {
        type: STRING,
        allowNull: false,
      },
      client: {
        type: STRING,
        allowNull: false,
      },
      law_firm: {
        type: STRING,
        allowNull: false,
      },
      attorney_city: {
        type: STRING,
        allowNull: false,
      },
      attorney_state: {
        type: STRING,
        allowNull: false,
      },
      description: {
        type: STRING,
        allowNull: false,
      },
      fee: {
        type: FLOAT,
        
      },
      covered_items: {
        type: STRING,
        
      },
      date: {
        type: DATE,
        allowNull: false,
      },
      attorney_signed: {
        type: BOOLEAN,
        defaultValue: false,
      },
      client_signed: {
        type: BOOLEAN,
        defaultValue: false,
      },

      firm_id: {
        type: INTEGER,
        allowNull: false,
      },
      pre_settlement_percent: {
        type: FLOAT,
      },
      post_settlement_percent: {
        type: FLOAT,
      },
      retainer: {
        type: FLOAT
      }
    },
    {
      tableName,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    },
  );

  return Contract;
};
