import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { CaseTemplateSelectionComponent } from '@app/features/case-template/case-template-selection/case-template-selection.component';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { Matter } from '@app/core/interfaces/matter';
import { MatterTask } from '@app/core/interfaces/matter-task';
import { Staff } from '@app/core/interfaces/staff';
import { DialogService } from '@ngneat/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-matter-tab-tasks',
  templateUrl: './matter-tab-tasks.component.html',
  styleUrls: ['./matter-tab-tasks.component.scss']
})
export class MatterTabTasksComponent implements OnInit {
  @Input()
  get matter() {
    return this._matter;
  }

  set matter(value: Matter) {
    this._matter = value;
  }

  private _matter: Matter;

  staff$: Observable<Staff[]>;

  staffMembers: Staff[];
  
  filteredStaffMembers: Staff[];

  @ViewChildren('taskName') taskNames;

  constructor(
    private _matterService: MatterService,
    private _staffService: StaffService,
    private _dialog: DialogService
  ) {
    this.staff$ = _staffService.entities$;
  }

  ngOnInit() {
    this.staff$.pipe(take(1)).subscribe(s => {
      this.staffMembers = s;
      this.filteredStaffMembers = s;
    })
  }

  displayFn(value, options): string {
    const selectedStaffMember = options.find((option) => option.value === value);
    return selectedStaffMember ? selectedStaffMember.viewValue : '';
  }

  filterStaffMembers(event) {
    this.filteredStaffMembers =
      event && event.length
        ? this.staffMembers.filter((staff) =>
            staff.user.full_name.toLowerCase().includes(event.toLowerCase())
          )
        : [...this.staffMembers];
  }

  trackByIndex(index, item) {
    return item.id;
  }

  createMatterTask(matterId: number): void {
    const task: MatterTask = {
      matter_id: matterId
    };

    this._matterService.addMatterTask(task).subscribe();
  }

  updateTask(task, property, value) {
    let taskChanges = {
      ...task,
      [property]: value
    };

    console.log("VALUE", value, property);
    // add logic for adding a bill automatically
    if (property === "completed" && value === true) {
      console.log("TASK", task);
      let employee : any = this.staffMembers.filter(staff => staff.id == task.assignee_id)[0]
      console.log("employee", employee);
      let hourlyRate = employee.firms[0].firm_employee.hourly_rate;
      let employeeName = employee.full_name;
      console.log(hourlyRate);
      console.log("HOURS", task.hours);
      let bill = {
        matter_id: task.matter_id,
        hours: task.hours,
        description: task.name,
        track_time_for: task.assignee_id,
        type: "0",
        billing_type: "Hourly",
        payment_type: "Private Pay",
        date: new Date(),
        amount: task.hours * hourlyRate,
        employee_name: employeeName
      }
      console.log("THE NEW BILL", bill);
      console.log(typeof(bill.hours))
      this._matterService.createBillOrPayment(bill).subscribe();
    }

    this._matterService.updateMatterTask(taskChanges).subscribe();
  }

  deleteTask(taskId) {
    this._matterService.deleteMatterTask(taskId).subscribe();
  }

  openCaseTemplateDialog(): void {
    const caseTemplateDialog = this._dialog.open(CaseTemplateSelectionComponent, {
      size: 'lg',
      data: {
        attorney_id: this.matter.attorney_id
      }
    });

    caseTemplateDialog.afterClosed$.subscribe((templateTasks) => {
      if (templateTasks && templateTasks.length) {
        this.applyTemplateTasks(templateTasks, this.matter.id);
      }
    });
  }

  private applyTemplateTasks(templateTasks, matterId: number): void {
    templateTasks.forEach((t) => {
      t.matter_id = matterId;

      this._matterService.addMatterTask(t).subscribe();
    });
  }
}
