import { FirmTemplateTask } from "./firm-template-task";
import { CaseTemplate } from "./case-template";

export interface FirmCaseTemplate extends CaseTemplate {
    firm_id?: number;
    firm_template_tasks: FirmTemplateTask[]
}