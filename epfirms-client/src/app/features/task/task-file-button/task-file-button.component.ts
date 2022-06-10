import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FirmTemplateTaskFile } from '@app/features/case-template/interfaces/firm-template-task-file';
import { CaseTemplateService } from '@app/features/case-template/services/case-template.service';
import { TaskFile } from '../interfaces/task-file';

@Component({
  selector: 'app-task-file-button',
  templateUrl: './task-file-button.component.html',
  styleUrls: ['./task-file-button.component.scss'],
})
export class TaskFileButtonComponent {
  @Input()
  set files(value: TaskFile[] | FirmTemplateTaskFile[]) {
    this._files = value;
  }

  get files(): TaskFile[] | FirmTemplateTaskFile[] {
    return this._files;
  }

  @Input() readonly: boolean = false;

  @Output() fileSelect: EventEmitter<FileList> = new EventEmitter<FileList>();

  @Output() editFile: EventEmitter<number> = new EventEmitter<number>();

  @Output() deleteFile: EventEmitter<number> = new EventEmitter<number>();

  private _files: TaskFile[] | FirmTemplateTaskFile[] = [];

  constructor(private _caseTemplateService: CaseTemplateService) {}

  emitAttach(event): void {
    const files: FileList = event.target.files;

    if (files.length) {
      this.fileSelect.emit(files);
    }
  }

  emitEdit(id: number): void {
    this.editFile.emit(id);
  }

  emitDelete(id: number): void {
    this.deleteFile.emit(id);
  }

  openFile(file) {
    this._caseTemplateService.getTaskFileDownloadURL(file.key).subscribe((res) => {
      window.open(res.url, '_blank');
    });
  }
}
