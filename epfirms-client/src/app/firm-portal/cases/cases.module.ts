import { CdkTableModule } from '@angular/cdk/table'
import { NgModule } from '@angular/core'
import { CoreModule } from '@app/core/core.module'
import { SharedModule } from '@app/shared/shared.module'
import { DialogModule } from '@ngneat/dialog'
import { TippyModule } from '@ngneat/helipopper'
import { MenuModule } from 'headlessui-angular'
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
    ],
})
export class CasesPageModule {}