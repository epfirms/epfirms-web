import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CaseTemplateDetailsPageComponent } from './case-template-details-page/case-template-details-page.component'

const routes: Routes = [{ path: '', component: CaseTemplateDetailsPageComponent}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CaseTemplateDetailsPageRoutingModule {}