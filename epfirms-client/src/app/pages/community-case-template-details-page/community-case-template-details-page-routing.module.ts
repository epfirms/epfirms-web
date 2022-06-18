import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CommunityCaseTemplateDetailsPageComponent } from './community-case-template-details-page/community-case-template-details-page.component'

const routes: Routes = [{ path: '', component: CommunityCaseTemplateDetailsPageComponent}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CommunityCaseTemplateDetailsPageRoutingModule {}