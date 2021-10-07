export class TemplateTask {
  id: number;
  template_id: number;
  user_id: number;
  task_description: number;
  no_of_days_from_start_date: number;

  constructor(){};
  clone(task) {
    this.id = task.id;
    this.template_id = task.template_id;
    this.user_id = task.user_id;
    this.task_description = task.task_description;
    this.no_of_days_from_start_date = task.no_of_days_from_start_date;
  }
}
