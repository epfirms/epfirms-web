import { CdkTableModule } from '@angular/cdk/table'
import { NgModule } from '@angular/core'
import { CoreModule } from '@app/core/core.module'
import { AutocompleteModule } from '@app/shared/autocomplete/autocomplete.module'
import { AvatarModule } from '@app/shared/avatar/avatar.module'
import { ButtonModule } from '@app/shared/button/button.module'
import { EditableModule } from '@app/shared/editable/editable.module'
import { InputModule } from '@app/shared/input/input.module'
import { MenuModule } from '@app/shared/menu/menu.module'
import { PaginatorModule } from '@app/shared/paginator/paginator.module'
import { TagModule } from '@app/shared/tag/tag.module'
import { DialogModule } from '@ngneat/dialog'
import { TippyModule } from '@ngneat/helipopper'
import { CasesPageRoutingModule } from './cases-routing.module'
import { CasesComponent } from './cases.component'

@NgModule({
    declarations: [CasesComponent],
    imports: [
        CoreModule,
        CasesPageRoutingModule,
        CdkTableModule,
        TippyModule,
        DialogModule,
        TagModule,
        AvatarModule,
        PaginatorModule,
        ButtonModule,
        AutocompleteModule,
        EditableModule,
        InputModule,
        MenuModule
    ],
})
export class CasesPageModule {}