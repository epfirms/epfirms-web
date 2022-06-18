import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() file: any;

  @Input() sms: any;

  @Input() readonly: boolean = false;

  @Output() taskChange: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(
    private _caseTemplateService: CaseTemplateService,
    private _modalService: EpModalService
    ) { }

  ngOnInit(): void {
  }

  attachSmsToTask(sms: any) {
    console.log(sms);
    this.task.firm_template_task_sms_message = sms;
    this.taskChange.emit();
  }

  deleteSms(smsId: number) {
    if(this.task.id) {
      this._modalService.create({
        epContent: ConfirmDialogComponent,
        epOkText: 'Confirm',
        epCancelText: 'Cancel',
        epAutofocus: null,
        epComponentParams: {
          title: 'Remove text message',
          body: 'Are you sure you want to remove this text message? This action cannot be undone.'
        },
        epOnOk: () => {
          if (smsId) {
            this._caseTemplateService.deleteTaskSms(smsId).subscribe();
          }
          
          this.sms = null;
          this.taskChange.emit();
        }
      });
    } else {
      this.sms = null;
    }
  }

  attachFilesToTask(files: FileList) {
    const file: File = files[0];

    const taskFile: FirmTemplateTaskFile = {
      name: file.name,
      description: file.type,
      file: file
    };

    this.task.firm_template_task_file = taskFile;
    this.taskChange.emit();
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
          this.task.firm_template_task_file = null;
            this.taskChange.emit();
        }
      });
    }
  }
}
