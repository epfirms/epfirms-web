import { Database } from '@src/core/Database';

export class AppointeeService {
  public static async getByUserId(id): Promise<any> {
    try {
      let familyMemberAppointees = await Database.models.appointee.findAll({
        where: {
          user_id: id,
          table_link: 'family_members'
        },

        include: [
          {
            model: Database.models.family_members,
            include: [
              {
                model: Database.models.member_relationships
              }
            ]
          }
        ]
      });
      familyMemberAppointees = familyMemberAppointees.map((e) => {
        let dataValues = e.dataValues;
        let memberData = e.dataValues.FamilyMember;
        delete dataValues.FamilyMember;
        delete dataValues.created_at;
        delete dataValues.updated_at;

        return {
          ...dataValues,
          first_name: memberData.first_name,
          middle_name: memberData.middle_name,
          last_name: memberData.last_name,

          relationship:
            memberData.MemberRelationships[0].user_id == id
              ? memberData.MemberRelationships[0].relationship
              : memberData.MemberRelationships[0].relationship == 'other_member'
              ? memberData.MemberRelationships[0].relationship
              : "Spouse's " + memberData.MemberRelationships[0].relationship,
          relationship_name:
            memberData.MemberRelationships[0].user_id == id
              ? memberData.MemberRelationships[0].relationship_name
              : memberData.MemberRelationships[0].relationship == 'other_member'
              ? "Spouse's " + memberData.MemberRelationships[0].relationship_name
              : memberData.MemberRelationships[0].relationship_name,

          profileImage_aws_link: memberData.profileImage_aws_link,

          phone: memberData.phone,
          email: memberData.email,

          street_1: memberData.street_1,
          street_2: memberData.street_2,
          city: memberData.city,
          state: memberData.state,
          zip: memberData.zip
        };
      });

      let nonFamilyMemberAppointees = await Database.models.appointee.findAll({
        where: {
          user_id: id,
          table_link: 'non_family_member'
        },

        include: [
          {
            model: Database.models.non_family_member
          }
        ]
      });
      nonFamilyMemberAppointees = nonFamilyMemberAppointees.map((e) => {
        let dataValues = e.dataValues;
        let memberData = e.dataValues.NonFamilyMember;
        delete dataValues.NonFamilyMember;
        delete dataValues.created_at;
        delete dataValues.updated_at;

        return {
          ...dataValues,
          first_name: memberData.first_name,
          middle_name: memberData.middle_name,
          last_name: memberData.last_name,

          relationship:
            memberData.user_id == id
              ? memberData.relationship
              : "Spouse's " + memberData.relationship,
          profileImage_aws_link: memberData.profileImage_aws_link,

          phone: memberData.phone,
          email: memberData.email,

          street_1: memberData.street_1,
          street_2: memberData.street_2,
          city: memberData.city,
          state: memberData.state,
          zip: memberData.zip
        };
      });

      let userAppointees = await Database.models.appointee.findAll({
        where: {
          user_id: id,
          table_link: 'users'
        },
        include: [
          {
            model: Database.models.user
          }
        ]
      });
      userAppointees = userAppointees.map((e) => {
        let dataValues = e.dataValues;
        let memberData = e.dataValues.User.dataValues;
        delete dataValues.User;
        delete dataValues.created_at;
        delete dataValues.updated_at;

        return {
          ...dataValues,
          first_name: memberData.first_name,
          middle_name: memberData.middle_name,
          last_name: memberData.last_name,

          relationship: 'Spouse',
          profileImage_aws_link: memberData.profileImage_aws_link,

          phone: memberData.phone,
          email: memberData.email,

          street_1: memberData.street_1,
          street_2: memberData.street_2,
          city: memberData.city,
          state: memberData.state,
          zip: memberData.zip
        };
      });
      return Promise.resolve({
        success: true,
        data: {
          familyMemberAppointees,
          nonFamilyMemberAppointees,
          userAppointees
        }
      });
    } catch (err) {
      return Promise.reject({
        success: false,
        msg: err
      });
    }
  }

  public static async getMaxRanksByUserId(id): Promise<any> {
    try {
      let query = `
          SELECT MAX(executor_rank) as executor, MAX(trustee_rank) as trustee, MAX(gomc_rank) as gomc, MAX(goe_rank) as goe, MAX(pg_rank) as pg, MAX(mpoa_rank) as mpoa, MAX(dpoa_rank) as dpoa 
            FROM appointee WHERE user_id = ${id};`;

      const getRanks = await Database.sequelize.query(query, {
        type: Database.sequelize.QueryTypes.SELECT
      });

      return Promise.resolve({
        success: true,
        data: getRanks
      });
    } catch (err) {
      return Promise.reject({
        success: false,
        msg: err
      });
    }
  }

  public static async getByLookupTable(id, tableLink): Promise<any> {
    try {
      if (!id || !tableLink) {
        throw new Error('Incorrect parameters; appointee lookup id and table link is required.');
      }

      const getAppointee = await Database.models.appointee.findAll({
        where: {
          member_id: id,
          table_link: tableLink
        }
      });

      return Promise.resolve({
        success: 'true',
        data: getAppointee
      });
    } catch (err) {
      return Promise.reject({
        success: false,
        msg: err
      });
    }
  }

  public static async upsert(appointeeData): Promise<any> {
    try {
      let newAppointee = await Database.models.appointee.upsert(appointeeData, {
        returning: true
      });

      return Promise.resolve({
        success: true,
        data: newAppointee
      });
    } catch (err) {
      return Promise.reject({
        success: false,
        msg: err
      });
    }
  }

  public static async modify(appointeeData): Promise<any> {
    try {
      const updateRow = await Database.models.appointee.findById(appointeeData.id);

      await updateRow.update(appointeeData);

      return Promise.resolve({
        success: true,
        data: updateRow
      });
    } catch (err) {
      return Promise.reject({
        success: false,
        msg: err
      });
    }
  }

  public static async modifyByLookupTable(userId, lookupId, tableLink, relationship): Promise<any> {
    try {
      const updateRow = await Database.models.appointee.update(
        {
          relationship: relationship
        },
        {
          where: {
            user_id: userId,
            member_id: lookupId,
            table_link: tableLink
          }
        }
      );
      return Promise.resolve({
        success: true,
        data: updateRow
      });
    } catch (err) {
      return Promise.reject({
        success: false,
        msg: err
      });
    }
  }

  public static async delete(id): Promise<any> {
    try {
      await Database.models.appointee.destroy({
        where: {
          id
        }
      });

      return Promise.resolve({
        success: true
      });
    } catch (err) {
      return Promise.reject({
        success: false,
        msg: err
      });
    }
  }

  public static async deleteByLookupTable(userId, lookupId, tableLink): Promise<any> {
    try {
      await Database.models.appointee.destroy({
        where: {
          userId,
          lookupId,
          tableLink
        }
      });

      return Promise.resolve({
        success: true
      });
    } catch (err) {
      return Promise.reject({
        success: false,
        msg: err
      });
    }
  }
}
