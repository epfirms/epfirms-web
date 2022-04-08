import { Database } from '@src/core/Database';
import { Service } from 'typedi';
const bcrypt = require('bcrypt');

@Service()
export class UserService {
  public async isRegistered(userId: number): Promise<boolean> {
    const user = await Database.models.user.findOne({
      attributes: ['id', 'email', 'password'],
      where: {
        id: userId,
      },
    });

    if (!user.email) {
      return Promise.resolve(true);
    }

    if (!user.password) {
      return Promise.resolve(false);
    }

    return Promise.resolve(true);
  }

  public async get(attribute: string, value: any): Promise<any> {
    const user = await Database.models.user.findOne({
      where: {
        [attribute]: value,
      },
    });

    return Promise.resolve(user);
  }

  public async create(userData): Promise<any> {
    if (userData.password) {
      const { password } = userData;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      userData.password = hash;
    }

    const user = await Database.models.user.create(userData);

    return Promise.resolve(user);
  }

  public async update(userData): Promise<any> {
    if (userData.password) {
      const { password } = userData;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      userData.password = hash;
    }

    const user = await Database.models.user.update(userData, { where: { id: userData.id } });

    const updatedUserData = await Database.models.user.findOne({ where: { id: userData.id } });
    return Promise.resolve(updatedUserData);
  }

  public async getFamilyMemberById(id: number): Promise<any> {
    // const { family_member, user } = Database.models;
    // const member = await user.findOne({
    //   include: [
    //     {
    //       model: user,
    //       as: 'FamilyMember',
    //       required: true,
    //       through: {
    //         model: family_member,
    //         where: { id },
    //         as: 'family_member'
    //       }
    //     },
    //   ]
    // });
    // return Promise.resolve(member);
  }

  public async getAllFamilyMembers(userId: number): Promise<any> {
    const { family_member, user } = Database.models;
    const foundUser = await user.findByPk(userId);
    const familyMembers = await foundUser.getMember();

    return Promise.resolve(familyMembers);
  }

  public async addFamilyMember(userId: number, familyMember): Promise<any> {
    const { user } = Database.models;

    const currentUser = await user.findByPk(userId);

    let existingUser;
    if (familyMember.id) {
      existingUser = await user.findOne({
        where: {
          id: familyMember.id,
        },
      });
    }

    // if existing user update the user's info that is coming in with request
    if (existingUser) {
      const updated = await user.update(familyMember, { where: { id: existingUser.id } });
    }
    let member;
    if (existingUser && existingUser.id) {
      member = await currentUser.addMember(existingUser, {
        through: { relationship_type: familyMember.relationship_type },
      });
    } else {
      member = await currentUser.createMember(familyMember, {
        through: { relationship_type: familyMember.relationship_type },
      });
    }

    return Promise.resolve();
  }

  public async updateFamilyMember(familyMember): Promise<any> {
    const user = await Database.models.family_member.update(familyMember);

    return Promise.resolve(user);
  }

  public async removeFamilyMember(userId: number, familyMemberId: number): Promise<any> {
    const { user } = Database.models;

    const currentUser = await user.findByPk(userId);

    const familyMemberUser = await user.findByPk(familyMemberId);

    const removed = await currentUser.removeMember(familyMemberUser);

    return Promise.resolve(removed);
  }

  public async getAllAppointees(userId: number): Promise<any> {
    const { family_member, user } = Database.models;
    const foundUser = await user.findByPk(userId);
    const familyMembers = await foundUser.getAppointed_user();

    return Promise.resolve(familyMembers);
  }

  public async addAppointee(userId: number, appointee): Promise<any> {
    try {
      const { user } = Database.models;

      const currentUser = await user.findByPk(userId);

      let existingUser;
      if (appointee.id) {
        existingUser = await user.findOne({
          where: {
            id: appointee.id,
          },
        });
      }
      // if existing user update the user's info that is coming in with request
      if (existingUser) {
        const updated = await user.update(appointee, { where: { id: existingUser.id } });
      }
      let newAppointee;
      const { rank, executor, trustee, dpoa, mpoa, gop, goe, gomc } = appointee;
      if (existingUser && existingUser.id) {
        newAppointee = await currentUser.addAppointed_user(existingUser, {
          through: { rank, executor, trustee, dpoa, mpoa, gop, goe, gomc },
        });
      } else {
        newAppointee = await currentUser.createAppointed_user(appointee, {
          through: { rank, executor, trustee, dpoa, mpoa, gop, goe, gomc },
        });
      }

      return Promise.resolve({
        ...newAppointee.dataValues,
        appointee: { rank, executor, trustee, dpoa, mpoa, gop, goe, gomc },
      });
    } catch (error) {
      console.error(error);
    }
  }

  public async updateAppointee(appointeeId: number, data): Promise<any> {
    const appointee = await Database.models.appointee.findOne({ where: { id: appointeeId } });

    if (appointee) {
      const updateUser = await Database.models.user.update(data.user, {
        where: { id: appointee.appointee_id },
      });

      const updateAppointee = await Database.models.appointee.update(data.appointee, {
        where: { id: appointeeId },
      });

      const updatedAppointee = await Database.models.user.findOne({
        where: { id: appointee.appointee_id },
      });

      return Promise.resolve(updatedAppointee);
    }

    return Promise.reject(new Error('Error updating appointee'));
  }

  public async removeAppointee(userId: number, appointedUserId: number): Promise<any> {
    const { user } = Database.models;

    const currentUser = await user.findByPk(userId);

    const appointeeUser = await user.findByPk(appointedUserId);

    const removed = await currentUser.removeAppointed_user(appointeeUser);

    return Promise.resolve(removed);
  }
}
