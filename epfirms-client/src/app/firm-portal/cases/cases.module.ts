import { CdkTableModule } from '@angular/cdk/table'
import { NgModule } from '@angular/core'
import { CoreModule } from '@app/core/core.module'
import { AvatarModule } from '@app/shared/avatar/avatar.module'
import { ButtonModule } from '@app/shared/button/button.module'
import { PaginatorModule } from '@app/shared/paginator/paginator.module'
import { TagModule } from '@app/shared/tag/tag.module'
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
        CasesPageRoutingModule,
        MenuModule,
        CdkTableModule,
        NgxSelectModule,
        TippyModule,
        DialogModule,
        TagModule,
        AvatarModule,
        PaginatorModule,
        ButtonModule
    ],
})
export class CasesPageModule {}