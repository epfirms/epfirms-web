import { MatterTaskController } from './matter-task.controller';
import { MatterNoteController } from './matter-note.controller';
import { MatterController } from './matter.controller';
import { MatterIntakeController } from './matter-intake.controller';
import Container from 'typedi';
import { MatterTaskFileController } from './matter-task-file.controller';

const matterController = Container.get(MatterController);

const matterTaskController = Container.get(MatterTaskController);

const matterNoteController = new MatterNoteController();

const matterIntakeController = Container.get(MatterIntakeController);

const matterTaskFileController = Container.get(MatterTaskFileController);

export { matterController, matterTaskController, matterNoteController, matterIntakeController, matterTaskFileController };
