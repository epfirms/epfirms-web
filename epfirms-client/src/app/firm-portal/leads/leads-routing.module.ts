import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LeadsComponent } from './leads.component'

const routes: Routes = [{ path: '', component: LeadsComponent }]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LeadsPageRoutingModule {}