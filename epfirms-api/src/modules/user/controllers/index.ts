import { UserController } from './user.controller';
import { FamilyMemberController } from './family-member.controller';
import { AppointeeController } from './appointee.controller';
import Container from 'typedi';

const userController = Container.get(UserController);
const familyMemberController = Container.get(FamilyMemberController);
const appointeeController = Container.get(AppointeeController);

export { userController, familyMemberController, appointeeController};
