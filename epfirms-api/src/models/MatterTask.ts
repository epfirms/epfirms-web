import { DATEONLY } from 'sequelize/types';

module.exports = (sequelize, { INTEGER, BOOLEAN, STRING, DATE, DATEONLY, FLOAT }) => {
  const tableName = 'matter_task';

  const MatterTask = sequelize.define(
    tableName,
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      matter_id: {
        type: INTEGER
      },
      name: {
        type: STRING
      },
      assignee_id: {
        type: INTEGER
      },
      start: {
        type: DATE
      },
      end: {
        type: DATE
      },
      hours: {
        type: FLOAT,
      },
      due: {
        type: DATE
      },
      completed: {
        type: BOOLEAN,
        defaultValue: false
      }
    },
    {
      tableName,
    }
  );

  return MatterTask;
};
