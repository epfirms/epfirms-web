import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugReporterModalComponent } from './bug-reporter-modal/bug-reporter-modal.component';



@NgModule({
  declarations: [
    BugReporterModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BugReporterModalComponent,
  ]
})
export class DeveloperToolsModule { }
