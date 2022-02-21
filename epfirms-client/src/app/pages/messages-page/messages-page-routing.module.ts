import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MessagesPageComponent } from './messages-page/messages-page.component'

const routes: Routes = [{ path: '', component: MessagesPageComponent }]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MessagesPageRoutingModule {}