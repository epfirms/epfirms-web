import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FirmTemplateTaskFile } from '@app/features/task-template/interfaces/firm-template-task-file';
import { TaskTemplateService } from '@app/features/task-template/services/task-template.service';
import { AwsService } from '@app/shared/_services/aws.service';
import { TaskFile } from '../interfaces/task-file';

@Component({
  selector: 'app-task-file-button',
  templateUrl: './task-file-button.component.html',
  styleUrls: ['./task-file-button.component.scss'],
  host: {
    class: 'flex items-center'
  }
})
export class TaskFileButtonComponent {
  @Input()
  set files(value: TaskFile[] | FirmTemplateTaskFile[]) {
    this._files = value;
  }
  get files(): TaskFile[] | FirmTemplateTaskFile[] {
    return this._files;
  }

  @Output() fileSelect: EventEmitter<FileList> = new EventEmitter<FileList>();
  @Output() editFile: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteFile: EventEmitter<number> = new EventEmitter<number>();

  private _files: TaskFile[] | FirmTemplateTaskFile[] = [];

  constructor(private _taskTemplateService: TaskTemplateService) {}

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
    this._taskTemplateService.getTaskFileDownloadURL(file.key).subscribe((res) => {
      window.open(res.url, '_blank');
    });
  }
}
