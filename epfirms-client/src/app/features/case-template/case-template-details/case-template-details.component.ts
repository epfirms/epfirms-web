import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { Staff } from '@app/core/interfaces/staff';
import { merge, Observable } from 'rxjs';
import { DialogRef, DialogService } from '@ngneat/dialog';
import { usaStatesFull } from '@app/shared/utils/us-states/states';
import { FirmCaseTemplate } from '../interfaces/firm-case-template';
import {
  CaseTemplateLawCategory,
  caseTemplateLawCategories
} from '../enums/case-template-law-category';
import { USAState } from '@app/shared/utils/us-states/typings';
import { FirmTemplateTaskFile } from '../interfaces/firm-template-task-file';
import { CaseTemplateService } from '../services/case-template.service';
import { createMask } from '@ngneat/input-mask';
import { map, take } from 'rxjs/operators';
import { firmRoleOptions, FirmStaffRole } from '@app/features/firm-staff/enums/firm-staff-role';
import { AssigneeGroup, AssigneeType, TemplateTaskAssignee } from '../interfaces/template-task-assignee';
import { FirmRoleService } from '@app/features/firm-staff/services/firm-role.service';

@Component({
  selector: 'app-case-template-details',
  templateUrl: './case-template-details.component.html',
  styleUrls: ['./case-template-details.component.scss']
})
export class CaseTemplateDetailsComponent implements OnInit {
  public template: FirmCaseTemplate = {
    template_name: '',
    law_category: CaseTemplateLawCategory.OTHER,
    state_category: '',
    firm_template_tasks: []
  };

  public staff$: Observable<Staff[]>;

  staffMembers: Staff[];

  filteredStaffMembers: TemplateTaskAssignee[];

  firmRoles: FirmStaffRole[] = firmRoleOptions;

  filteredFirmRoles: TemplateTaskAssignee[];

  assigneeGroups: AssigneeGroup[] = [];

  filteredAssigneeGroups: AssigneeGroup[] = [];

  public usaStates: USAState[] = usaStatesFull;

  public caseTemplateLawCategories: CaseTemplateLawCategory[] = caseTemplateLawCategories;

  public timeInputMask = createMask<number>({
    alias: 'numeric',
    groupSeparator: ':',
    digits: 2,
    placeholder: '00',
    digitsOptional: false,
    parser: (value: string) => {
      console.log(value);
      const values = value.split(':');
      const minutesFromHours = parseInt(values[0]) * 60;
      const minutes = parseInt(values[1]);

      console.log(minutesFromHours + minutes);

      return minutesFromHours + minutes;
    }
  });

  constructor(
    private staffService: StaffService,
    private dialogRef: DialogRef,
    private _caseTemplateService: CaseTemplateService,
    private _dialogService: DialogService,
    private _firmRoleService: FirmRoleService
  ) {
    this.staff$ = staffService.entities$;

    if (dialogRef.data) {
      const { template } = dialogRef.data;
      this.template = Object.assign({}, template);
      // Deep clone tasks -- needed for change comparison in case-template-list
      this.template.firm_template_tasks = [...template.firm_template_tasks];
    }
  }

  ngOnInit(): void {
    this._createAssigneeGroups();
  }

  displayFn(value, options): string {
    const selectedAssignee = options.find((option) => option.value === value);
    return selectedAssignee ? selectedAssignee.viewValue : '';
  }

  filterStaffMembers(event) {
    // this.filteredStaffMembers =
    //   event && event.length
    //     ? this.staffMembers.filter((staff) =>
    //         staff.user.full_name.toLowerCase().includes(event.toLowerCase())
    //       )
    //     : [...this.staffMembers];
    // this.filteredFirmRoles =
    //   event && event.length
    //     ? this.firmRoles.filter((role) => role.includes(event.toLowerCase()))
    //     : [...this.firmRoles];
  }

  addTemplateTask(): void {
    this.template.firm_template_tasks.push({
      user_id: null,
      name: '',
      no_of_days_from_start_date: null,
      firm_template_task_files: [],
      duration_minutes: null
    });
  }

  removeTemplateTask(taskIndex: number): void {
    this.template.firm_template_tasks.splice(taskIndex, 1);
  }

  save() {
    this.close({
      template: this.template,
      tasks: this.template.firm_template_tasks
    });
  }

  close(data?: any) {
    this.dialogRef.close(data);
  }

  setAssignee(event, index) {
    const selectedOption = event.option.value;
    this.template.firm_template_tasks[index].assignee_type = selectedOption.type;
    this.template.firm_template_tasks[index].assignee_id = selectedOption.id;

    if (selectedOption.type === 'staff') {
      this.staff$
        .pipe(
          map((staff) => {
            return staff.find((s) => s.user.id === selectedOption);
          }),
          take(1)
        )
        .subscribe((staffMember) => {
          this.template.firm_template_tasks[index].user = { ...staffMember.user };
        });
    }
  }

  setDescription(event, index) {
    this.template.firm_template_tasks[index].name = event;
  }

  attachFilesToTask(files: FileList, taskIndex: number) {
    const file: File = files[0];

    const taskFile: FirmTemplateTaskFile = {
      name: file.name,
      description: file.type,
      file: file
    };

    this.template.firm_template_tasks[taskIndex].firm_template_task_files.push(taskFile);
  }

  editTaskFile(fileId: number) {}

  deleteTaskFile(fileId: number, taskIndex: number) {
    if (this.template.firm_template_tasks[taskIndex].id) {
      const deleteDialogRef = this._dialogService.confirm({
        title: `Remove task file`,
        body: `Are you sure you want to remove this file? This action cannot be undone.`
      });

      deleteDialogRef.afterClosed$.subscribe((confirmed) => {
        if (confirmed) {
          if (fileId) {
            this._caseTemplateService.deleteTaskFile(fileId).subscribe();
          }
          this.template.firm_template_tasks[taskIndex].firm_template_task_files =
            this.template.firm_template_tasks[taskIndex].firm_template_task_files.filter(
              (t) => t.id !== fileId
            );
        }
      });
    }
  }

  /** Populates assignee groups with staff members and firm roles. */
  private _createAssigneeGroups(): void {
    const getStaff = this.staff$.pipe(take(1), map(staff => ({type: 'Staff', assignees: [...staff]})));
    const getRoles = this._firmRoleService.get().pipe(map(response => ({type: 'Role', assignees: [...response.roles]})));

    merge(getStaff, getRoles).pipe().subscribe((group) => {
      // Assignees are normalized for consistent use.
      const assignees: TemplateTaskAssignee[] = group.assignees.map(a => (
        {
          id: group.type === 'Staff' ? a.user.id : a.id,
          name: group.type === 'Staff' ? a.user.full_name : a.name,
          profile_image: group.type === 'Staff' ? a.user.profile_image : null
        } as TemplateTaskAssignee
        ));
        const assigneeGroup: AssigneeGroup = {
          type: group.type as AssigneeType,
          assignees
        }

        group.assignees = [...assignees];
        this.assigneeGroups = [...this.assigneeGroups, assigneeGroup];
        // Sort to make 'Role' group display first in the ep-option-group.
        this.filteredAssigneeGroups = [...this.assigneeGroups.sort((a,b) => a.type === 'Role' ? -1 : 1)];
    });
  }
}
