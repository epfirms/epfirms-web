import { FirmTemplateTask } from "./firm-template-task";
import { TaskTemplate } from "./task-template";

export interface FirmTaskTemplate extends TaskTemplate {
    firm_id?: number;
    firm_template_tasks: FirmTemplateTask[]
}