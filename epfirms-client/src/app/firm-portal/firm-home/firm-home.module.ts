import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { AvatarModule } from '@app/shared/avatar/avatar.module';
import { EditableModule } from '@app/shared/editable/editable.module';
import { PaginatorModule } from '@app/shared/paginator/paginator.module';
import { TagModule } from '@app/shared/tag/tag.module';
import { DialogModule } from '@ngneat/dialog';
import { TippyModule } from '@ngneat/helipopper';
import { MenuModule } from 'headlessui-angular';
import { NgxSelectModule } from 'ngx-select-ex';

import { FirmHomeRoutingModule } from './firm-home-routing.module';
import { FirmHomeComponent } from './firm-home.component';


@NgModule({
  declarations: [FirmHomeComponent],
  imports: [
    CoreModule,
    FirmHomeRoutingModule,
    MenuModule,
    CdkTableModule,
    NgxSelectModule,
    TippyModule,
    DialogModule,
    TagModule,
    AvatarModule,
    PaginatorModule,
    EditableModule,
  ]
})
export class FirmHomeModule { }
