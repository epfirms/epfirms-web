import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CaseTemplateListPageComponent } from './case-template-list-page/case-template-list-page.component'

const routes: Routes = [{ path: '', component: CaseTemplateListPageComponent}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CaseTemplateListPageRoutingModule {}