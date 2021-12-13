import { TaskTemplateLawCategory } from "../enums/task-template-law-category";
import { TemplateTask } from "./template-task";

export interface TaskTemplate {
    id?: number;
    template_name: string;
    law_category: TaskTemplateLawCategory,
    state_category: string;
    template_tasks?: TemplateTask[]
};