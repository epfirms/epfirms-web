import { UserController } from './user.controller';
import { FamilyMemberController } from './family-member.controller';
import { AppointeeController } from './appointee.controller';

const userController = new UserController();
const familyMemberController = new FamilyMemberController();
const appointeeController = new AppointeeController();

export { userController, familyMemberController, appointeeController};
