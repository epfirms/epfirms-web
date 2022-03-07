module.exports = (sequelize, { INTEGER, BOOLEAN, STRING, TEXT, FLOAT, DATE, JSON }) => {
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
        
      },
      state: {
        type: STRING,
        
      },
      client: {
        type: STRING,
        
      },
      law_firm: {
        type: STRING,
        
      },
      attorney_city: {
        type: STRING,
        
      },
      attorney_state: {
        type: STRING,
        
      },
      description: {
        type: STRING,
        
      },
      fee: {
        type: FLOAT,
        
      },
      covered_items: {
        type: STRING,
        
      },
      date: {
        type: DATE,
        
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
      retainer_amount: {
        type: FLOAT
      },
      contract_type : {
        type: STRING
      },
      case_id : {
        type: STRING
      },
      content : {
        type: JSON,
        allowNull: false
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
