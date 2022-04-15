import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugReporterModalComponent } from './bug-reporter-modal/bug-reporter-modal.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BugReporterModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BugReporterModalComponent,
  ]
})
export class DeveloperToolsModule { }
