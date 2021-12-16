import { NgModule } from '@angular/core';
import { LeadsPageRoutingModule } from './leads-routing.module';
import { CdkTableModule } from '@angular/cdk/table';
import { CoreModule } from '@app/core/core.module';
import { AvatarModule } from '@app/shared/avatar/avatar.module';
import { PaginatorModule } from '@app/shared/paginator/paginator.module';
import { TagModule } from '@app/shared/tag/tag.module';
import { DialogModule } from '@ngneat/dialog';
import { TippyModule } from '@ngneat/helipopper';
import { LeadsComponent } from './leads.component';
import { ButtonModule } from '@app/shared/button/button.module';
import { EditableModule } from '@app/shared/editable/editable.module';
import { AutocompleteModule } from '@app/shared/autocomplete/autocomplete.module';
import { InputModule } from '@app/shared/input/input.module';
import { MenuModule } from '@app/shared/menu/menu.module';



@NgModule({
  declarations: [LeadsComponent],
  imports: [
    CoreModule,
    LeadsPageRoutingModule,
    CdkTableModule,
    TippyModule,
    DialogModule,
    TagModule,
    AvatarModule,
    PaginatorModule,
    ButtonModule,
    EditableModule,
    AutocompleteModule,
    InputModule,
    MenuModule
  ]
})
export class LeadsPageModule { }
