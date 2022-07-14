import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { CaseTemplateSelectionComponent } from '@app/features/case-template/case-template-selection/case-template-selection.component';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { Matter } from '@app/features/matter/matter.model';
import { MatterTask } from '@app/core/interfaces/matter-task';
import { Staff } from '@app/core/interfaces/staff';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { EpModalService } from '@app/shared/modal/modal.service';
import { TaskSmsConfirmationComponent } from '@app/features/task/task-sms-confirmation/task-sms-confirmation.component';
import { ConversationService } from '@app/features/conversation/services/conversation.service';
import { FirmService } from '@app/firm-portal/_services/firm-service/firm.service';
import { Store } from '@ngrx/store';
import { selectCurrentTabTasks } from '@app/store/matter-tabs/matter-tabs.reducer';
import { TaskService } from '@app/features/task/task.service';

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

  tasks$: Observable<any> = this.store.select(selectCurrentTabTasks).pipe(map(tasks => tasks.sort(this.sortByDueDate)));

  staff$: Observable<Staff[]>;

  staffMembers: Staff[];
  
  filteredStaffMembers: Staff[];

  @ViewChildren('taskName') taskNames;

  constructor(
    private _matterService: MatterService,
    private _staffService: StaffService,
    private _modalService: EpModalService,
    private _conversationService: ConversationService,
    private _firmService: FirmService,
    private store: Store,
    private _taskService: TaskService
  ) {
    this.staff$ = _staffService.entities$;
  }

  ngOnInit() {
    this.staff$.pipe(take(1)).subscribe(s => {
      this.staffMembers = s;
      this.filteredStaffMembers = s;
    })
  }

  sortByDueDate(a, b) {
    if (a.completed && b.completed) {
      return new Date(a.due).getTime() - new Date(b.due).getTime();
    }

    if (a.completed) {
      return 1;
    } 
    
    if (b.completed) {
      return -1
    }

    return new Date(a.due).getTime() - new Date(b.due).getTime();
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

    this._taskService.create(task).subscribe()
  }

  updateTask(task, property, value) {
    let taskChanges = {
      ...task,
      [property]: value
    };

    // Actions performed when a task a marked complete.
    if (property === "completed" && value === true) {
      this.createBill(task);
      if (task.matter_task_sms_message && task.matter_task_sms_message.body) {
        this.sendSmsConfirmation(task);
      }
    }

    this._taskService.update(task.id, taskChanges).subscribe();
  }

  createBill(task) {
    let employee : any = this.staffMembers.find(staff => staff.user.id == task.assignee_id);
    let hourlyRate = employee ? employee.hourly_rate : 0;
    let employeeName = employee ? employee.user.full_name : 'No assignee';

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

    this._matterService.createBillOrPayment(bill).subscribe();
  }

  sendSmsConfirmation(task) {
    this._modalService.create({
      epContent: TaskSmsConfirmationComponent,
      epOkText: 'Send',
      epCancelText: 'Cancel',
      epComponentParams: {
        cellPhoneNumber: this.matter.client.cell_phone || '',
        smsBody: task.matter_task_sms_message.body
      },
      epOnOk: async (componentInstance) => {
        this._conversationService.findSmsConversation(componentInstance.cellPhoneNumber).then((conversation) => {
          if(conversation) {
            this._conversationService.sendMessage(conversation.sid, {body: componentInstance.smsBody, author: this.matter.attorney_id.toString()}).subscribe();
          } else {
            this.createConversation().subscribe((res) => {
              this._conversationService.sendMessage(res.conversationSid, {body: componentInstance.smsBody, author: this.matter.attorney_id.toString()}).subscribe();
            });
          }
        })
      }
    });
  }

  // Creates conversation, sends welcome message, and emits created conversation Sid.
  createConversation() {
    return this._conversationService.createMatterConversation(this.matter.id).pipe(
      switchMap((response) => this._firmService.getCurrentFirm().pipe(
        map((firm) => {
          if (this.matter.matter_type === 'case') {
            return `Hello, this is your attorney, ${this.matter.attorney.full_name}, at ${firm.name}. I would like to communicate with you through text. If you do not want me to text you, please reply STOP.`;
          } else {
            return `Thank you for contacting ${firm.name}. We would like to communicate with you through text. If you do not want us to text you, please reply STOP.`
          }
        }),
        switchMap((message) => this._conversationService.sendMessage(response.data.conversationSid, { body: message, author: this.matter.attorney_id.toString() }).pipe(map(() => ({conversationSid: response.data.conversationSid}))))
      ))
    );
  }

  deleteTask(taskId) {
    this._taskService.delete(taskId).subscribe();
  }

  openCaseTemplateDialog(): void {
    const caseTemplateModal = this._modalService.create({
      epContent: CaseTemplateSelectionComponent,
      epOkText: null,
      epCancelText: null,
      epAutofocus: 'auto',
      epMaxWidth: '48rem',
      epComponentParams: {
        attorney_id: this.matter.attorney_id
      }
    });

    caseTemplateModal.afterClose.subscribe((templateTasks) => {
      if (templateTasks) {
        this.applyTemplateTasks(templateTasks, this.matter.id);
      }
    })
  }

  private applyTemplateTasks(templateTasks, matterId: number): void {
    templateTasks.forEach((t) => {
      t.matter_id = matterId;

      this._taskService.create(t).subscribe();
    });
  }
}
