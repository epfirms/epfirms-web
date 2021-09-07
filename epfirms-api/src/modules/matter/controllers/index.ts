import { MatterTaskController } from './matter-task.controller';
import { MatterNoteController } from './matter-note.controller';
import { MatterController } from './matter.controller';
import { MatterIntakeController } from './matter-intake.controller';

const matterController = new MatterController();

const matterTaskController = new MatterTaskController();

const matterNoteController = new MatterNoteController();

const matterIntakeController = new MatterIntakeController();

export { matterController, matterTaskController, matterNoteController, matterIntakeController };
