import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CaseTemplateService } from '@app/features/case-template/services/case-template.service';
import { MatterTask } from '@app/core/interfaces/matter-task';
import { FirmTeamService } from '@app/features/firm-staff/services/firm-team.service';
import { EpModalRef } from '@app/shared/modal/modal-ref';
import {
  caseTemplateLawCategories,
  CaseTemplateLawCategory,
} from '../enums/case-template-law-category';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { OptionComponent } from '@app/shared/option/option/option.component';
import { DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW, hasModifierKey } from '@angular/cdk/keycodes';
import { NgScrollbar } from 'ngx-scrollbar';
import { TeamService } from '@app/features/team/services/team.service';
import { concatMap, from, map, mergeMap } from 'rxjs';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';

@Component({
  selector: 'app-case-template-selection',
  templateUrl: './case-template-selection.component.html',
  styleUrls: ['./case-template-selection.component.scss'],
  host: {
    '(keydown)': '_handleKeydown($event)',
    class: 'divide-y divide-gray-100',
  },
})
export class CaseTemplateSelectionComponent implements OnInit, AfterViewInit {
  MS_IN_DAY = 86400000;

  caseTemplates = [];

  startDate: Date = new Date();

  members: any[] = [];

  attorney_id: number;

  categories: CaseTemplateLawCategory[] = caseTemplateLawCategories;

  filteredCaseTemplates = [];

  @ViewChildren('options') options: QueryList<OptionComponent>;

  @ViewChild('scrollbar') scrollbar: NgScrollbar;

  _keyManager: ActiveDescendantKeyManager<OptionComponent>;

  get activeOption(): OptionComponent | null {
    if (this._keyManager) {
      return this._keyManager.activeItem;
    }

    return null;
  }

  constructor(
    private _caseTemplateService: CaseTemplateService,
    private _modalRef: EpModalRef,
    private _teamService: TeamService,
    private _staffService: StaffService,
  ) {}

  ngOnInit(): void {
    this._caseTemplateService.getAll().subscribe((templates) => {
      this.caseTemplates = templates.reduce((acc, curr) => {
        const existingTemplate = acc.find((e) => e.category === curr.law_category);
        if (existingTemplate) {
          existingTemplate.templates.push(curr);
        } else {
          acc.push({
            category: curr.law_category,
            templates: [curr],
          });
        }

        return acc;
      }, []);

      this.filteredCaseTemplates = this.caseTemplates;
    });

    this._teamService
      .getAllByUserId(this.attorney_id, { role: 'attorney' })
      .pipe(
        concatMap((res) => {
          return res.data && res.data.length
            ? this._teamService
                .getAllMembers(res.data[0].id)
                .pipe(mergeMap(({data}) => this._staffService.entities$.pipe(map((staff) => {
                  return data.reduce((acc, curr) => {
                    const employee = staff.find((s) => s.id === curr.firm_employee_id);
                    if (employee) {
                      acc.push({
                        ...curr,
                        user_id: employee.user.id
                      });
                    }

                    return acc;
                  }, []);
                }))))
            : from([]);
        }),
      )
      .subscribe((response) => {
        this.members = response;
      });
  }

  ngAfterViewInit(): void {
    this._keyManager = new ActiveDescendantKeyManager<OptionComponent>(this.options).withWrap();
  }

  setDate(event): void {
    this.startDate = new Date(event.target.value + 'T00:00:00');
  }

  submit() {
    const templateTasks = this.formatTasks();
    this._modalRef.destroy(templateTasks);
  }

  public formatTasks(): MatterTask[] {
    const tasks = this.activeOption.value.firm_template_tasks;
    return tasks.map((t) => {
      // Get an employee based on the specified user_id or role
      const assigneeId: number =
        t.role && !t.user_id ? this.getAssigneeIdFromRole(t.role) : t.user_id;

      return {
        name: t.name,
        due: this.addDaysToDate(this.startDate, t.no_of_days_from_start_date).toString(),
        assignee_id: assigneeId,
        matter_task_files: [...t.firm_template_task_files],
      };
    });
  }

  selectByClick(template) {
    const option = this.options.find((opt) => opt.value === template);
    this._keyManager.setActiveItem(option);
    this.activeOption._selectViaInteraction();
    this._clearPreviousSelectedOption(this.activeOption);
    // this._resetActiveItem();
  }

  filterOptions(event) {
    const searchValue = event.target.value;
    if (searchValue && searchValue.length) {
      this.filteredCaseTemplates = this.caseTemplates.reduce((acc, curr) => {
        const filteredTemplates = curr.templates.filter((t) =>
          t.template_name.toLowerCase().includes(searchValue.toLowerCase()),
        );
        if (filteredTemplates && filteredTemplates.length) {
          acc.push({
            category: curr.category,
            templates: filteredTemplates,
          });
        }

        return acc;
      }, []);
    } else {
      this.filteredCaseTemplates = this.caseTemplates;
    }
  }

  private _handleKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;

    // Prevent the default action on all escape key presses. This is here primarily to bring IE
    // in line with other browsers. By default, pressing escape on IE will cause it to revert
    // the input value to the one that it had on focus, however it won't dispatch any events
    // which means that the model value will be out of sync with the view.
    if (keyCode === ESCAPE && !hasModifierKey(event)) {
      event.preventDefault();
    }

    if (this.activeOption && keyCode === ENTER) {
      this.activeOption._selectViaInteraction();
      this._clearPreviousSelectedOption(this.activeOption);
      event.preventDefault();
    } else {
      const prevActiveItem = this._keyManager.activeItem;
      const isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;

      if (keyCode === TAB) {
        this._keyManager.onKeydown(event);
      }

      if (isArrowKey || this._keyManager.activeItem !== prevActiveItem) {
        this._keyManager.onKeydown(event);

        this.scrollbar.scrollToElement(this.activeOption._getHostElement(), { duration: 75 });
      }
    }
  }

  private _resetActiveItem(): void {
    this._keyManager.setActiveItem(-1);
  }

  private _clearPreviousSelectedOption(skip: OptionComponent) {
    this.options.forEach((option) => {
      if (option !== skip && option.selected) {
        option.deselect();
      }
    });
  }

  /**
   * Gets the user id from the member on the attorney's team with a matching role.
   * If there is no team member assigned to that role, use the attorney id instead.
   */
  private getAssigneeIdFromRole(role: string): number {
    const teamMember = this.members.find((m) => m.role === role);
    return teamMember ? teamMember.user_id : this.attorney_id;
  }

  private addDaysToDate(date: Date, numberOfDays: number): Date {
    return new Date(date.getTime() + numberOfDays * this.MS_IN_DAY);
  }
}
