const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } = require('@configs/vars');

export class Database {
  public static models: any;
  public static sequelize: any;
  public static async connect() {
    this.sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'mysql',
      define: {
        underscored: true,
        underscoredAll: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      },
      pool: {
        max: 20,
        min: 0,
        idle: 80000,
        evict: 80000,
        acquire: 80000
      }
    });

    this.models = {
      user: require('../models/User')(this.sequelize, Sequelize),
      firm: require('../models/Firm')(this.sequelize, Sequelize),
      firm_employee: require('../models/FirmEmployee')(this.sequelize, Sequelize),
      client: require('../models/Client')(this.sequelize, Sequelize),
      matter: require('../models/Matter')(this.sequelize, Sequelize),
      matter_task: require('../models/MatterTask')(this.sequelize, Sequelize),
      matter_task_comment: require('../models/MatterTaskComment')(this.sequelize, Sequelize),
      matter_note: require('../models/MatterNote')(this.sequelize, Sequelize),
      firm_subscription: require('../models/FirmSubscription')(this.sequelize, Sequelize),
      document: require('../models/Document')(this.sequelize, Sequelize),
      legal_area: require('../models/LegalArea')(this.sequelize, Sequelize),
      matter_activity: require('../models/MatterActivity')(this.sequelize, Sequelize),
      family_member: require('../models/FamilyMember')(this.sequelize, Sequelize),
      real_estate: require('../models/RealEstate')(this.sequelize, Sequelize),
      money_account: require('../models/MoneyAccount')(this.sequelize, Sequelize),
      vehicle: require('../models/Vehicle')(this.sequelize, Sequelize),
      matter_intake: require('../models/MatterIntake')(this.sequelize, Sequelize),
      verification_token: require('../models/verification_token')(this.sequelize, Sequelize),
      review: require('../models/Review')(this.sequelize, Sequelize),
      appointee: require('../models/Appointee')(this.sequelize, Sequelize),
      password_reset_token: require('../models/PasswordResetToken')(this.sequelize, Sequelize),
      matter_billing: require('../models/MatterBilling')(this.sequelize, Sequelize),
      template_task: require('../models/TemplateTask')(this.sequelize, Sequelize),
      task_template: require('../models/TaskTemplate')(this.sequelize, Sequelize)
    };

    this.models.user.belongsToMany(this.models.firm, { through: this.models.firm_employee });
    this.models.firm.belongsToMany(this.models.user, { through: this.models.firm_employee });

    this.models.user.belongsToMany(this.models.firm, {
      through: this.models.client,
      as: 'FirmClient'
    });
    this.models.firm.belongsToMany(this.models.user, {
      through: this.models.client,
      as: 'ClientFirm'
    });

    this.models.user.belongsToMany(this.models.user, {
      through: this.models.family_member,
      as: 'member',
      foreignKey: 'user_id'
    });
    this.models.user.belongsToMany(this.models.user, {
      through: this.models.family_member,
      as: 'member_user',
      foreignKey: 'family_member_id'
    });

    this.models.user.hasMany(this.models.real_estate, { foreignKey: 'user_id' });
    this.models.real_estate.belongsTo(this.models.user, { foreignKey: 'user_id' });

    this.models.user.hasMany(this.models.money_account, { foreignKey: 'user_id' });
    this.models.money_account.belongsTo(this.models.user, { foreignKey: 'user_id' });

    this.models.user.hasMany(this.models.vehicle, { foreignKey: 'user_id' });
    this.models.vehicle.belongsTo(this.models.user, { foreignKey: 'user_id' });

    this.models.firm.hasMany(this.models.matter, {
      foreignKey: 'firm_id'
    });

    this.models.matter.belongsTo(this.models.firm, {
      foreignKey: 'firm_id'
    });

    this.models.user.hasMany(this.models.matter, { foreignKey: 'client_id', as: 'client' });
    this.models.matter.belongsTo(this.models.user, { foreignKey: 'client_id', as: 'client' });

    this.models.user.hasMany(this.models.matter, { foreignKey: 'spouse_id', as: 'spouse' });
    this.models.matter.belongsTo(this.models.user, { foreignKey: 'spouse_id', as: 'spouse' });

    this.models.user.hasMany(this.models.matter, { foreignKey: 'attorney_id', as: 'attorney' });
    this.models.matter.belongsTo(this.models.user, { foreignKey: 'attorney_id', as: 'attorney' });

    this.models.user.hasMany(this.models.matter, {
      foreignKey: 'opposing_counsel_id',
      as: 'opposing_counsel'
    });
    this.models.matter.belongsTo(this.models.user, {
      foreignKey: 'opposing_counsel_id',
      as: 'opposing_counsel'
    });

    this.models.user.hasMany(this.models.matter, {
      foreignKey: 'point_of_contact_id',
      as: 'point_of_contact'
    });
    this.models.matter.belongsTo(this.models.user, {
      foreignKey: 'point_of_contact_id',
      as: 'point_of_contact'
    });

    this.models.user.hasMany(this.models.matter_task, {
      foreignKey: 'assignee_id',
      as: 'assignee'
    });
    this.models.matter_task.belongsTo(this.models.user, {
      foreignKey: 'assignee_id',
      as: 'assignee'
    });

    this.models.matter.hasMany(this.models.matter_task, {
      foreignKey: 'matter_id'
    });

    this.models.matter.hasMany(this.models.matter_billing, {
      foreignKey: 'matter_id'
    });

    this.models.matter_billing.belongsTo(this.models.matter, {
      foreignKey: 'matter_id'
    })

    this.models.matter.hasMany(this.models.review, {
      foreignKey: 'matter_id'
    });

    this.models.matter_task.belongsTo(this.models.matter, {
      foreignKey: 'matter_id'
    });

    this.models.review.belongsTo(this.models.matter, {
      foreignKey: 'matter_id'
    });

    this.models.matter_note.belongsTo(this.models.matter, {
      foreignKey: 'matter_id'
    });

    this.models.user.hasMany(this.models.matter_note, {
      foreignKey: 'user_id'
    });

    this.models.matter_note.belongsTo(this.models.user, {
      foreignKey: 'user_id'
    });

    this.models.matter_task.belongsToMany(this.models.user, {
      through: { model: this.models.matter_task_comment, unique: false }
    });
    this.models.user.belongsToMany(this.models.matter_task, {
      through: { model: this.models.matter_task_comment, unique: false }
    });

    this.models.firm.hasOne(this.models.firm_subscription, {
      foreignKey: 'firm_id'
    });

    this.models.firm_subscription.belongsTo(this.models.firm, {
      foreignKey: 'firm_id'
    });

    this.models.firm.hasOne(this.models.legal_area, {
      foreignKey: 'firm_id'
    });

    this.models.legal_area.belongsTo(this.models.firm, {
      foreignKey: 'firm_id'
    });

    this.models.user.hasMany(this.models.document, { foreignKey: 'user_id', onDelete: 'cascade' });
    this.models.document.belongsTo(this.models.user, { foreignKey: 'user_id' });

    this.models.legal_area.hasMany(this.models.matter, {
      foreignKey: 'legal_area_id'
    });

    this.models.matter.belongsTo(this.models.legal_area, {
      foreignKey: 'legal_area_id'
    });
    this.models.user.hasMany(this.models.matter_activity, { foreignKey: 'user_id' });
    this.models.matter_activity.belongsTo(this.models.user, { foriegnKey: 'user_id' });

    this.models.matter_intake.hasOne(this.models.matter, {
      foreignKey: 'matter_intake_id'
    });
    this.models.matter.belongsTo(this.models.matter_intake, {
      foreignKey: 'matter_intake_id'
    });

    this.models.matter.hasMany(this.models.matter_note, {
      foreignKey: 'matter_id',
      onDelete: 'cascade'
    });

    this.models.user.belongsToMany(this.models.user, {
      through: this.models.appointee,
      as: 'appointed_user',
      foreignKey: 'user_id'
    });

    this.models.user.belongsToMany(this.models.user, {
      through: this.models.appointee,
      as: 'owner',
      foreignKey: 'appointee_id'
    });

    this.models.user.hasOne(this.models.password_reset_token, {
      foreignKey: 'user_id'
    });
    this.models.password_reset_token.belongsTo(this.models.user, {
      foreignKey: 'user_id'
    });

    this.models.firm.hasMany(this.models.task_template, {
      foreignKey: 'firm_id',
      onDelete: 'cascade'
    });
    this.models.task_template.belongsTo(this.models.firm, {
      foreignKey: 'firm_id'
    });

    this.models.task_template.hasMany(this.models.template_task, {
      foreignKey: 'template_id',
      onDelete: 'cascade'
    });
    this.models.template_task.belongsTo(this.models.task_template, {
      foreignKey: 'firm_id'
    });
  }

  public static async start() {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync();
      console.info('connection to the database has been established successfully');
    } catch (err) {
      console.info('unable to connect to the database:', err);
    }
  }
}
