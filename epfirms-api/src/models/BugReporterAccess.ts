// THIS MODEL IS CONTROLLED BY THE TOOL ACCESS MODULE
module.exports = (sequelize, {
    INTEGER,
    BOOLEAN,
    STRING,
    TEXT
  }) => {
    const tableName = 'bug_reporter_access';

    const BugReporterAccess = sequelize.define(
      tableName, {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: INTEGER,
        },
        firm_id: {
          type: INTEGER,
          allowNull: false
        },
        bug_reporter_access: {
            type: BOOLEAN,
            defaultValue: false
        }
     }, {
        tableName,
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      },
    );

    return BugReporterAccess;
  };