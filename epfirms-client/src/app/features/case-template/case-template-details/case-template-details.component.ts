import { Component, OnInit } from '@angular/core';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { Staff } from '@app/core/interfaces/staff';
import { forkJoin, Observable } from 'rxjs';
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
import { AssigneeGroup, TemplateTaskAssignee } from '../interfaces/template-task-assignee';
import { FirmRoleService } from '@app/features/firm-staff/services/firm-role.service';
import { CaseTemplateCommunityService } from '../services/case-template-community.service';
import {HotToastService} from '@ngneat/hot-toast';
import { EpModalService } from '@app/shared/modal/modal.service';
import { ConfirmDialogComponent } from '@app/shared/confirm-dialog/confirm-dialog.component';

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

  filteredAssigneeGroups: AssigneeGroup[];

  public usaStates: USAState[] = usaStatesFull;

  public caseTemplateLawCategories: CaseTemplateLawCategory[] = caseTemplateLawCategories;

  public timeInputMask = createMask<number>({
    alias: 'numeric',
    groupSeparator: ':',
    digits: 2,
    placeholder: '00',
    digitsOptional: false,
    parser: (value: string) => {
      const values = value.split(':');
      const minutesFromHours = parseInt(values[0]) * 60;
      const minutes = parseInt(values[1]);

      return minutesFromHours + minutes;
    }
  });

  constructor(
    private staffService: StaffService,
    private _caseTemplateService: CaseTemplateService,
    private _firmRoleService: FirmRoleService,
    private _caseTemplateCommunityService: CaseTemplateCommunityService,
    private _toastService: HotToastService,
    private _modalService: EpModalService
  ) {
    this.staff$ = staffService.entities$;
  }

  ngOnInit(): void {
    this._createAssigneeGroups();
  }

  displayFn(value, options): string {
    console.log(value);
    const selectedAssignee = options.find((option) => option.value === value);
    return selectedAssignee ? selectedAssignee.viewValue : '';
  }

  filterStaffMembers(event) {

    this.filteredAssigneeGroups =
      event && event.length
        ?     this.assigneeGroups.map(group => {
          return {
            type: group.type,
            assignees: group.assignees.filter(assignee => assignee.name.toLowerCase().includes(event.toLowerCase()))
          }
        })
        : [...this.assigneeGroups];
  }

  addTemplateTask(): void {
    this.template.firm_template_tasks.push({
      user_id: null,
      name: '',
      no_of_days_from_start_date: null,
      firm_template_task_files: [],
      duration_minutes: null,
      firm_role_id: null
    });
  }

  removeTemplateTask(taskIndex: number): void {
    this.template.firm_template_tasks.splice(taskIndex, 1);
  }

  setAssignee(event, index) {
    const selectedOption = event.option.value;
    const assigneeType = event.option.group.label;

    if (assigneeType === 'Role') {
      this.template.firm_template_tasks[index].user_id = null;
      this.template.firm_template_tasks[index].firm_role_id = selectedOption
    } else if (assigneeType === 'Staff') {
      this.template.firm_template_tasks[index].user_id = selectedOption;
      this.template.firm_template_tasks[index].firm_role_id = null;
    }

    // this.template.firm_template_tasks[index].assignee_type = selectedOption.type;
    // this.template.firm_template_tasks[index].assignee_id = selectedOption.id;
    console.log(event);
    if (assigneeType === 'Staff') {
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
      this._modalService.create({
        epContent: ConfirmDialogComponent,
        epOkText: 'Confirm',
        epCancelText: 'Cancel',
        epAutofocus: null,
        epComponentParams: {
          title: 'Remove task file',
          body: 'Are you sure you want to remove this file? This action cannot be undone.'
        },
        epOnOk: () => {
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

    forkJoin({staff: getStaff, roles: getRoles}).pipe().subscribe(({staff, roles}) => {
      const staffAssignees: TemplateTaskAssignee[] = staff.assignees.map(a => (
        {
          id: a.user.id,
          name:a.user.full_name,
          profile_image: a.user.profile_image
        } as TemplateTaskAssignee
        ));
      // Assignees are normalized for consistent use.
      const roleAssignees: TemplateTaskAssignee[] = roles.assignees.map(a => (
        {
          id:a.id,
          name: a.name
        } as TemplateTaskAssignee
        ));
        
        const rolesGroup: AssigneeGroup = {
          type: "Role",
          assignees: roleAssignees
        }

        const staffGroup: AssigneeGroup = {
          type: "Staff",
          assignees: staffAssignees
        }

        this.assigneeGroups = [rolesGroup, staffGroup];
        this.filteredAssigneeGroups = [rolesGroup, staffGroup];
    });
  }

  share(): void {
    this._modalService.create({
      epContent: ConfirmDialogComponent,
      epOkText: 'Confirm',
      epCancelText: 'Cancel',
      epAutofocus: null,
      epComponentParams: {
        title: 'Create community template',
        body: 'A copy of this template will be created and shared with other users in the case template community.'
      },
      epOnOk: () => {
        this._caseTemplateCommunityService.create(this.template).subscribe(() => {
          this._toastService.success('Successfully created community template');
        });
      }
    });
  }
}
