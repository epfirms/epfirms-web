import { TemplateTask } from "./template-task";

export class TaskTemplate {
  id: number;
  firm_id: number;
  legal_area: string;
  template_name: string;
  template_tasks?: TemplateTask[];
}
