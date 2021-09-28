import { TemplateTask } from "./template-task";

export class TaskTemplate {
  id: number;
  firm_id: number;
  legal_area: string;
  template_name: string;
  template_tasks?: TemplateTask[];

  constructor(firm_id, template_name){
    this.firm_id = firm_id;
    this.template_name = template_name;
  }
}
