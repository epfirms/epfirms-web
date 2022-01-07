import { CaseTemplateLawCategory } from "../enums/case-template-law-category";
import { TemplateTask } from "./template-task";

export interface CaseTemplate {
    id?: number;
    template_name: string;
    law_category: CaseTemplateLawCategory,
    state_category: string;
    template_tasks?: TemplateTask[]
};