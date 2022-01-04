import { Database } from '@src/core/Database';
import { Service } from 'typedi';
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

@Service()
export class MatterService {
  public async getOne(id: number): Promise<any> {
    const {
      matter,
      matter_task,
      user,
      legal_area,
      matter_intake,
      statement,
      matter_task_file,
      matter_billing_settings
    } = Database.models;
    const { sequelize } = Database;
    const matters = await matter.findOne({
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT SUM(amount) FROM `matter_billing` WHERE type = 0 AND matter_id = `matter`.id)'
            ),
            'total_billed'
          ],
          [
            sequelize.literal(
              '(SELECT SUM(amount) FROM `matter_billing` WHERE type = 1 AND matter_id = `matter`.id)'
            ),
            'total_paid'
          ]
        ]
      },
      where: {
        id,
        deleted: false
      },
      include: [
        {
          model: user,
          as: 'client',
          required: true
        },
        {
          model: user,
          as: 'attorney',
          required: true
        },
        {
          model: user,
          as: 'spouse'
        },
        {
          model: user,
          as: 'opposing_counsel'
        },
        {
          model: legal_area,
          as: 'legal_area'
        },
        {
          model: user,
          as: 'point_of_contact'
        },
        {
          model: matter_intake
        },
        {
          model: matter_task,
          include: [
            {
              model: user,
              as: 'assignee'
            },
            {
              model: matter_task_file
            }
          ]
        },
        {
          model: statement
        },
        {
          model: matter_billing_settings
        },
      ],
      order: [
        [
          sequelize.literal(
            '(CASE WHEN `matter_tasks`.completed = 1 THEN 1 END) asc, (CASE WHEN `matter_tasks`.due IS NULL THEN 3 END) asc, `matter_tasks`.due asc'
          )
        ]
      ]
    });

    return Promise.resolve(matters);
  }

  public async getAll(firmId): Promise<any> {
    const {
      matter,
      matter_task,
      user,
      legal_area,
      matter_intake,
      statement,
      matter_task_file,
      matter_billing_settings
    } = Database.models;
    const { sequelize } = Database;
    const matters = await matter.findAll({
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT SUM(amount) FROM `matter_billing` WHERE type = 0 AND matter_id = `matter`.id)'
            ),
            'total_billed'
          ],
          [
            sequelize.literal(
              '(SELECT SUM(amount) FROM `matter_billing` WHERE type = 1 AND matter_id = `matter`.id)'
            ),
            'total_paid'
          ]
        ]
      },
      where: {
        firm_id: firmId,
        deleted: false
      },
      include: [
        {
          model: user,
          as: 'client',
          required: true
        },
        {
          model: user,
          as: 'attorney',
          required: true
        },
        {
          model: user,
          as: 'spouse'
        },
        {
          model: user,
          as: 'opposing_counsel'
        },
        {
          model: legal_area,
          as: 'legal_area'
        },
        {
          model: user,
          as: 'point_of_contact'
        },
        {
          model: matter_intake
        },
        {
          model: matter_task,
          include: [
            {
              model: user,
              as: 'assignee'
            },
            {
              model: matter_task_file
            }
          ]
        },
        {
          model: statement
        },
        {
          model: matter_billing_settings
        },
      ],
      order: [
        [
          sequelize.literal(
            '(CASE WHEN `matter_tasks`.completed = 1 THEN 1 END) asc, (CASE WHEN `matter_tasks`.due IS NULL THEN 3 END) asc, `matter_tasks`.due asc'
          )
        ]
      ]
    });

    return Promise.resolve(matters);
  }

  public async create(matterData, firmId): Promise<any> {
    const { matter, user, legal_area, matter_task } = Database.models;
    let query = `
    SELECT concat(LPAD(${firmId}, 3, 0), "-", LPAD(MONTH(now()), 2, 0), "-", DATE_FORMAT(now(), "%y"), "-",
    (
    select lpad(ifnull(max(right(case_id, 3)), 0) + 1, 3, "0") from matter where left(case_id, 9) = concat(LPAD(${firmId}, 3, 0), "-", LPAD(MONTH(now()), 2, 0), "-", DATE_FORMAT(now(), "%y")))
    )
    as caseid;`;

    const generatedCaseId = await Database.sequelize.query(query, {
      type: Database.sequelize.QueryTypes.SELECT
    });

    matterData.case_id = generatedCaseId[0].caseid;

    const createdMatter = await matter.create(matterData);

    const newMatter = await this.getOne(createdMatter.id);

    return Promise.resolve(newMatter);
  }

  public async delete(id): Promise<any> {
    const firm = await Database.models.matter.delete({ where: { id } });

    return Promise.resolve(firm);
  }

  public async update(matterDetails): Promise<any> {
    const firm = await Database.models.matter.update(matterDetails, {
      where: { id: matterDetails.id }
    });

    return Promise.resolve(firm);
  }

  public async getByUserId(userId: number): Promise<any> {
    const { matter, user, legal_area, matter_intake } = Database.models;

    const matters = await matter.findAll({
      where: {
        [Op.or]: [
          {
            client_id: userId
          },
          {
            spouse_id: userId
          }
        ]
      },
      include: [
        {
          model: user,
          as: 'client',
          required: true
        },
        {
          model: user,
          as: 'attorney',
          required: true
        },
        {
          model: user,
          as: 'spouse'
        },
        {
          model: legal_area,
          as: 'legal_area'
        },
        {
          model: matter_intake
        },
        {
          model: user,
          as: 'point_of_contact'
        }
      ]
    });

    return Promise.resolve(matters);
  }

  //TODO: Email client when intake is sent
  public async createIntake(matterId: number, senderId: number): Promise<any> {
    const { matter_intake } = Database.models;

    const matterIntake = await matter_intake.create({
      matter_id: matterId,
      status: 'sent',
      sent_by: senderId
    });

    return Promise.resolve(matterIntake);
  }

  public async updateIntake(matterIntakeData): Promise<any> {
    const { matter_intake } = Database.models;

    const matterIntake = await matter_intake.update(matterIntakeData, {
      where: { id: matterIntakeData.id }
    });

    const updatedIntake = await matter_intake.findByPk(matterIntakeData.id);
    return Promise.resolve(updatedIntake);
  }
}
