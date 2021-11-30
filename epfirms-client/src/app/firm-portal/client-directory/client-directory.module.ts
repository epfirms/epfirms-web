import { NgModule } from '@angular/core';

import { ClientDirectoryRoutingModule } from './client-directory-routing.module';
import { CdkTableModule } from '@angular/cdk/table';
import { CoreModule } from '@app/core/core.module';
import { AvatarModule } from '@app/shared/avatar/avatar.module';
import { PaginatorModule } from '@app/shared/paginator/paginator.module';
import { TagModule } from '@app/shared/tag/tag.module';
import { DialogModule } from '@ngneat/dialog';
import { TippyModule } from '@ngneat/helipopper';
import { MenuModule } from 'headlessui-angular';
import { NgxSelectModule } from 'ngx-select-ex';
import { ClientDirectoryComponent } from './client-directory.component';
import { ButtonModule } from '@app/shared/button/button.module';


@NgModule({
  declarations: [ClientDirectoryComponent],
  imports: [
    CoreModule,
    ClientDirectoryRoutingModule,
    MenuModule,
    CdkTableModule,
    NgxSelectModule,
    TippyModule,
    DialogModule,
    TagModule,
    AvatarModule,
    PaginatorModule,
    ButtonModule
  ]
})
export class ClientDirectoryModule { }
