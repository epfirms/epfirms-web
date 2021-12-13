import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDirectoryComponent } from './client-directory.component';

const routes: Routes = [{ path: '', component: ClientDirectoryComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientDirectoryRoutingModule { }
