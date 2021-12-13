import { NgModule } from '@angular/core';

import { FirmPortalRoutingModule } from './firm-portal-routing.module';
import { FirmPortalComponent } from './firm-portal.component';
import { AddCaseComponent } from './overlays/add-case/add-case.component';
import { AddClientComponent } from './overlays/add-client/add-client.component';
import { AddStaffComponent } from './overlays/add-staff/add-staff.component';
import { DeleteStaffComponent } from './overlays/delete-staff/delete-staff.component';
import { EditClientComponent } from './overlays/edit-client/edit-client.component';
import { QuillModule } from 'ngx-quill';
import { DialogModule } from '@ngneat/dialog';
import { CoreModule } from '@app/core/core.module';
import { AutocompleteModule } from '@app/shared/autocomplete/autocomplete.module';
import { TagModule } from '@app/shared/tag/tag.module';
import { AvatarModule } from '@app/shared/avatar/avatar.module';
import { MatterTabModule } from '@app/features/matter-tab/matter-tab.module';
import { NavbarModule } from '@app/shared/navbar/navbar.module';
import { MenuModule } from 'headlessui-angular';
import { SharedModule } from '@app/shared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InputModule } from '@app/shared/input/input.module';


@NgModule({
  declarations: [
    FirmPortalComponent,
    AddCaseComponent,
    AddClientComponent,
    AddStaffComponent,
    DeleteStaffComponent,
    EditClientComponent
  ],
  imports: [
    CoreModule,
    FirmPortalRoutingModule,
    DialogModule,
    QuillModule,
    AutocompleteModule,
    TagModule,
    AvatarModule,
    MatterTabModule,
    NavbarModule,
    MenuModule,
    SharedModule,
    ScrollingModule,
    InputModule
  ]
})
export class FirmPortalModule {}
