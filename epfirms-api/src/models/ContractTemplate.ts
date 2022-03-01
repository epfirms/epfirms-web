
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT,
    FLOAT,
    DATE, 
    JSON
  }) => {
    const tableName = 'contract_template';

    const ContractTemplate = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        firm_id: {
          type: INTEGER,
          allowNull: false,
        },
        matter_id: {
            type: INTEGER,
        },
        title: {
            type: STRING
        },
        // the actual content of the template; it should be json generated
        // by quill js
        content: {
            type: JSON
        },
        // some properties for sharing in the future
        public: {
            type: BOOLEAN,
            defaultValue: false
        },
        // some properties for sharing in the future
        rating: {
            type: INTEGER,
            defaultValue: 0
        },
        // boolean properties that determine what kind fields
        // exist on the template
        today: {
            type: BOOLEAN,
            defaultValue : false
        },
        client: {
            type: BOOLEAN,
            defaultValue : false
        },
        client_address: {
            type: BOOLEAN,
            defaultValue : false
        },
        client_state: {
            type: BOOLEAN,
            defaultValue : false
        },
        client_county: {
            type: BOOLEAN,
            defaultValue : false
        },
        client_city: {
            type: BOOLEAN,
            defaultValue : false
        },
        client_zipcode: {
            type: BOOLEAN,
            defaultValue : false
        },
        attorney: {
            type: BOOLEAN,
            defaultValue : false
        },
        attorney_address: {
            type: BOOLEAN,
            defaultValue : false
        },
        attorney_state: {
            type: BOOLEAN,
            defaultValue : false
        },
        attorney_county: {
            type: BOOLEAN,
            defaultValue : false
        },
        attorney_city: {
            type: BOOLEAN,
            defaultValue : false
        },
        attorney_zipcode: {
            type: BOOLEAN,
            defaultValue : false
        },
        law_firm: {
            type: BOOLEAN,
            defaultValue : false
        },
        description: {
            type: BOOLEAN,
            defaultValue : false
        },
        flat_rate_fee: {
            type: BOOLEAN,
            defaultValue : false
        },
        covered_items: {
            type: BOOLEAN,
            defaultValue : false
        },
        retainer_amount: {
            type: BOOLEAN,
            defaultValue : false
        },
        pre_settlement_contingency: {
            type: BOOLEAN,
            defaultValue : false
        },
        post_settlement_contingency: {
            type: BOOLEAN,
            defaultValue : false
        },

        
      }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return ContractTemplate;
  };
