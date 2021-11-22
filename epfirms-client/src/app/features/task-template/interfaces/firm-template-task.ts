import { FirmTemplateTaskFile } from "./firm-template-task-file";
import { TemplateTask } from "./template-task";

export interface FirmTemplateTask extends TemplateTask {
    firm_template_task_files: FirmTemplateTaskFile[];
}