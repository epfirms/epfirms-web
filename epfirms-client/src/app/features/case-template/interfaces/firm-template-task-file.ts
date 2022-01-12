import { TaskFile } from "@app/features/task-file/interfaces/task-file";

export interface FirmTemplateTaskFile extends TaskFile {
    firm_template_task_id?: number;
}