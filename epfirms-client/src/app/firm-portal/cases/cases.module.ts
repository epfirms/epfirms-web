import { CdkTableModule } from '@angular/cdk/table'
import { NgModule } from '@angular/core'
import { CoreModule } from '@app/core/core.module'
import { IntakeModule } from '@app/features/intake/intake.module'
import { TaskTemplateModule } from '@app/features/task-template/task-template.module'
import { SharedModule } from '@app/shared/shared.module'
import { TabsModule } from '@app/shared/tabs/tabs.module'
import { DialogModule } from '@ngneat/dialog'
import { EditableModule } from '@ngneat/edit-in-place'
import { TippyModule } from '@ngneat/helipopper'
import { NgAisModule } from 'angular-instantsearch'
import { AngularMyDatePickerModule } from 'angular-mydatepicker'
import { MenuModule } from 'headlessui-angular'
import { QuillModule } from 'ngx-quill'
import { NgxSelectModule } from 'ngx-select-ex'
import { CasesPageRoutingModule } from './cases-routing.module'
import { CasesComponent } from './cases.component'

@NgModule({
    declarations: [CasesComponent],
    imports: [
        CoreModule,
        SharedModule,
        CasesPageRoutingModule,
        MenuModule,
        CdkTableModule,
        NgxSelectModule,
        TippyModule,
        DialogModule,
        NgAisModule
    ],
})
export class CasesPageModule {}