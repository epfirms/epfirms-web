import { Component, Input, OnInit } from '@angular/core';
import { FirmTemplateTaskFile } from '@app/features/case-template/interfaces/firm-template-task-file';
import { CaseTemplateService } from '@app/features/case-template/services/case-template.service';
import { ConfirmDialogComponent } from '@app/shared/confirm-dialog/confirm-dialog.component';
import { EpModalService } from '@app/shared/modal/modal.service';

@Component({
  selector: 'app-task-toolbar',
  templateUrl: './task-toolbar.component.html',
  styleUrls: ['./task-toolbar.component.scss']
})
export class TaskToolbarComponent implements OnInit {
  @Input() task: any;

  @Input() files: any = [];

  constructor(
    private _caseTemplateService: CaseTemplateService,
    private _modalService: EpModalService
    ) { }

  ngOnInit(): void {
  }

  attachFilesToTask(files: FileList) {
    const file: File = files[0];

    const taskFile: FirmTemplateTaskFile = {
      name: file.name,
      description: file.type,
      file: file
    };

    this.task.firm_template_task_files.push(taskFile);
  }

  deleteTaskFile(fileId: number) {
    if (this.task.id) {
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
          this.task.firm_template_task_files =
            this.task.firm_template_task_files.filter(
              (t) => t.id !== fileId
            );
        }
      });
    }
  }
}
