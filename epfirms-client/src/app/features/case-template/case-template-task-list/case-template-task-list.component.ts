import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { Staff } from '@app/core/interfaces/staff';
import { FirmRoleService } from '@app/features/firm-staff/services/firm-role.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { createMask } from '@ngneat/input-mask';
import { forkJoin, map, Observable, take } from 'rxjs';
import { AssigneeGroup, TemplateTaskAssignee } from '../interfaces/template-task-assignee';

@Component({
  selector: 'app-case-template-task-list',
  templateUrl: './case-template-task-list.component.html',
  styleUrls: ['./case-template-task-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CaseTemplateTaskListComponent),
      multi: true,
    },
  ],
})
export class CaseTemplateTaskListComponent implements OnInit, ControlValueAccessor {
  public staff$: Observable<Staff[]>;

  assigneeGroups: AssigneeGroup[] = [];

  filteredAssigneeGroups: AssigneeGroup[];

  staffMembers: Staff[];

  filteredStaffMembers: TemplateTaskAssignee[];

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
    },
  });

  onChange: any = () => {};

  onTouch: any = () => {};

  val = [];

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouch(val);
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _firmRoleService: FirmRoleService,
    private staffService: StaffService,
  ) {
    this.staff$ = this.staffService.entities$;
  }

  ngOnInit(): void {
    this._createAssigneeGroups();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDescription(event, task) {
    task.name = event;
    this.value = this.val;
  }

  filterStaffMembers(event) {
    this.filteredAssigneeGroups =
      event && event.length
        ? this.assigneeGroups.map((group) => {
            return {
              type: group.type,
              assignees: group.assignees.filter((assignee) =>
                assignee.name.toLowerCase().includes(event.toLowerCase()),
              ),
            };
          })
        : [...this.assigneeGroups];
  }

  addTemplateTask(): void {
    const newTask = {
      user_id: null,
      name: '',
      no_of_days_from_start_date: null,
      firm_template_task_files: [],
      duration_minutes: null,
      role: null,
    };
    this.value = [...this.val, newTask];
  }

  removeTemplateTask(task): void {
    this.value = this.val.filter(t => t !== task);
  }

  displayFn(value, options): string {
    const selectedAssignee = options.find((option) => option.value === value);
    return selectedAssignee ? selectedAssignee.viewValue : '';
  }

  setAssignee(event, task) {
    const selectedOption = event.option.value;
    const assigneeType = event.option.group.label;
    if (assigneeType === 'Role') {
      task.user_id = null;
      task.role = selectedOption;
    } else if (assigneeType === 'Staff') {
      task.user_id = selectedOption;
      task.role = null;
      this.staff$
        .pipe(
          map((staff) => {
            return staff.find((s) => s.user.id === selectedOption);
          }),
          take(1),
        )
        .subscribe((staffMember) => {
          task.user = staffMember.user;
        });
    }

    this.value = this.val;
  }

  private _createAssigneeGroups(): void {
    const getStaff = this.staff$.pipe(
      take(1),
      map((staff) => ({ type: 'Staff', assignees: [...staff] })),
    );
    const getRoles = this._firmRoleService
      .get()
      .pipe(map((response) => ({ type: 'Role', assignees: [...response] })));

    forkJoin({ staff: getStaff, roles: getRoles })
      .pipe()
      .subscribe(({ staff, roles }) => {
        const staffAssignees: TemplateTaskAssignee[] = staff.assignees.map(
          (a) =>
            ({
              id: a.user.id,
              name: a.user.full_name,
              profile_image: a.user.profile_image,
            } as TemplateTaskAssignee),
        );
        // Assignees are normalized for consistent use.
        const roleAssignees: TemplateTaskAssignee[] = roles.assignees.map(
          (a) =>
            ({
              name: a,
            } as TemplateTaskAssignee),
        );

        const rolesGroup: AssigneeGroup = {
          type: 'Role',
          assignees: roleAssignees,
        };

        const staffGroup: AssigneeGroup = {
          type: 'Staff',
          assignees: staffAssignees,
        };

        this.assigneeGroups = [rolesGroup, staffGroup];
        this.filteredAssigneeGroups = [rolesGroup, staffGroup];
      });
  }
}
