import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirmStaffListComponent } from './firm-staff-list/firm-staff-list.component';
import { AccordionModule } from '@app/shared/accordion/accordion.module';
import { AvatarModule } from '@app/shared/avatar/avatar.module';
import { FirmTeamListComponent } from './firm-team-list/firm-team-list.component';
import { TeamMembersDialogComponent } from './team-members-dialog/team-members-dialog.component';
import { AutocompleteModule } from '@app/shared/autocomplete/autocomplete.module';
import { InputModule } from '@app/shared/input/input.module';
import { CoreModule } from '@app/core/core.module';
import { ButtonModule } from '@app/shared/button/button.module';
import { StaffMemberDialogComponent } from './staff-member-dialog/staff-member-dialog.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { PipesModule } from '@app/core/pipes/pipes.module';



@NgModule({
  declarations: [
    FirmStaffListComponent,
    FirmTeamListComponent,
    TeamMembersDialogComponent,
    StaffMemberDialogComponent
  ],
  imports: [
    CoreModule,
    AccordionModule,
    AvatarModule,
    AutocompleteModule,
    InputModule,
    ButtonModule,
    InputMaskModule,
    PipesModule
  ],
  exports: [
    FirmStaffListComponent,
    FirmTeamListComponent
  ]
})
export class FirmStaffModule { }
