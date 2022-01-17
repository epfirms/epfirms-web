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
      firm_template_task: require('../models/FirmTemplateTask')(this.sequelize, Sequelize),
      firm_case_template: require('../models/FirmCaseTemplate')(this.sequelize, Sequelize),
      external_lead: require('../models/ExternalLead')(this.sequelize, Sequelize),
      statement: require('../models/Statement')(this.sequelize, Sequelize),
      beta_signup: require('../models/BetaSignup')(this.sequelize, Sequelize),
      firm_template_task_file: require('../models/FirmTemplateTaskFile')(this.sequelize, Sequelize),
      matter_task_file: require('../models/MatterTaskFile')(this.sequelize, Sequelize),
      matter_billing_settings: require('../models/MatterBillingSettings')(this.sequelize, Sequelize),
      stripe_account: require("../models/StripeAccount")(this.sequelize, Sequelize),
      community_case_template: require('../models/CommunityCaseTemplate')(this.sequelize, Sequelize),
      community_template_task: require('../models/CommunityTemplateTask')(this.sequelize, Sequelize),
      community_template_task_file: require('../models/CommunityTemplateTaskFile')(this.sequelize, Sequelize),
      firm_team: require('../models/FirmTeam')(this.sequelize, Sequelize),
      firm_team_member: require('../models/FirmTeamMember')(this.sequelize, Sequelize),
      firm_role: require('../models/FirmRole')(this.sequelize, Sequelize),
      firm_employee_role: require('../models/FirmEmployeeRole')(this.sequelize, Sequelize),
      legal_insurance: require('../models/LegalInsurance')(this.sequelize, Sequelize),
      customer_account: require('../models/CustomerAccount')(this.sequelize, Sequelize)
    };

    this.models.user.belongsToMany(this.models.firm, { through: this.models.firm_employee, as: 'employer', foreignKey: 'user_id' });
    this.models.firm.belongsToMany(this.models.user, { through: this.models.firm_employee, as: 'employee', foreignKey: 'firm_id' });
    this.models.firm.hasMany(this.models.firm_employee, {foreignKey: 'firm_id'});
    this.models.firm_employee.belongsTo(this.models.user, {foreignKey: 'user_id'});

    this.models.user.belongsToMany(this.models.firm, {
      through: this.models.client,
      as: 'client_firm'
    });
    this.models.firm.belongsToMany(this.models.user, {
      through: this.models.client,
      as: 'firm_client'
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

    this.models.firm.hasMany(this.models.firm_case_template, {
      foreignKey: 'firm_id',
      onDelete: 'cascade'
    });

    this.models.firm_case_template.belongsTo(this.models.firm, {
      foreignKey: 'firm_id'
    });

    this.models.firm_case_template.hasMany(this.models.firm_template_task, {
      foreignKey: 'template_id',
      onDelete: 'cascade'
    });
    this.models.firm_template_task.belongsTo(this.models.firm_case_template, {
      foreignKey: 'template_id'
    });

    this.models.matter.hasMany(this.models.statement, {
      foreignKey: 'matter_id'
    });
    this.models.statement.belongsTo(this.models.matter, {
      foreignKey: 'matter_id'
    });
    this.models.user.hasMany(this.models.firm_template_task, {
      foreignKey: 'user_id'
    });
    this.models.firm_template_task.belongsTo(this.models.user, {
      foreignKey: 'user_id'
    });

    this.models.firm_role.hasMany(this.models.firm_template_task, {
      foreignKey: 'firm_role_id'
    });
    this.models.firm_template_task.belongsTo(this.models.firm_role, {
      foreignKey: 'firm_role_id'
    });

    this.models.firm_template_task.hasMany(this.models.firm_template_task_file, {
      foreignKey: 'firm_template_task_id'
    });

    this.models.firm_template_task_file.belongsTo(this.models.firm_template_task);

    this.models.matter_task.hasMany(this.models.matter_task_file, {
      foreignKey: 'matter_task_id'
    });

    this.models.matter_task_file.belongsTo(this.models.matter_task);

    this.models.matter.hasOne(this.models.matter_billing_settings, {
      foreignKey: 'matter_id'
    });

    this.models.matter_billing_settings.belongsTo(this.models.matter, {
      foreignKey: 'matter_id'
    });
    this.models.firm.hasOne(this.models.stripe_account, {foreignKey: 'firm_id', onDelete: 'cascade'});
    this.models.stripe_account.belongsTo(this.models.stripe_account, {foreignKey: 'firm_id'});

    this.models.firm.hasMany(this.models.community_case_template, {
      foreignKey: 'firm_id'
    });

    this.models.community_case_template.belongsTo(this.models.firm, {
      foreignKey: 'firm_id'
    });

    this.models.community_case_template.hasMany(this.models.community_template_task, {
      foreignKey: 'template_id',
      onDelete: 'cascade'
    });

    this.models.community_template_task.belongsTo(this.models.community_case_template, {
      foreignKey: 'template_id'
    });

    this.models.firm_role.hasMany(this.models.community_template_task, {
      foreignKey: 'firm_role_id'
    });

    this.models.community_template_task.belongsTo(this.models.firm_role, {
      foreignKey: 'firm_role_id'
    });

    this.models.community_template_task.hasMany(this.models.community_template_task_file, {
      foreignKey: 'community_template_task_id'
    });

    this.models.community_template_task_file.belongsTo(this.models.community_template_task);

    this.models.firm.hasMany(this.models.firm_team, {
      foreignKey: 'firm_id'
    });

    this.models.firm_team.belongsTo(this.models.firm, {
      foreignKey: 'firm_id'
    });

    this.models.firm_employee.hasMany(this.models.firm_team, {
      foreignKey: 'owner'
    });

    this.models.firm_team.belongsTo(this.models.firm_employee, {
      foreignKey: 'owner'
    });

    this.models.firm_team.belongsToMany(this.models.firm_employee, { through: { model: this.models.firm_team_member, unique: false }, as: 'member'});
    this.models.firm_employee.belongsToMany(this.models.firm_team, { through: { model: this.models.firm_team_member, unique: false }, as: 'team'});

    this.models.firm_role.hasMany(this.models.firm_team_member);
    this.models.firm_team_member.belongsTo(this.models.firm_role);

    this.models.firm.hasMany(this.models.firm_role, {foreignKey: 'firm_id', as: 'firm_role'});
    this.models.firm_role.belongsTo(this.models.firm, {
      foreignKey: 'firm_id'
    });

    this.models.firm_employee.belongsToMany(this.models.firm_role, { through: 'firm_employee_role', as: 'role', foreignKey: 'firm_employee_id'});
    this.models.firm_role.belongsToMany(this.models.firm_employee, { through: 'firm_employee_role', foreignKey: 'firm_role_id'});

    this.models.matter.hasOne(this.models.customer_account, {foreignKey: 'matter_id'});
    this.models.customer_account.belongsTo(this.models.matter, {foreignKey: 'matter_id'});

    this.models.matter.hasOne(this.models.legal_insurance, {foreignKey: 'matter_id'});
    this.models.legal_insurance.belongsTo(this.models.matter, {foreignKey: 'matter_id'});
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
