import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CaseTemplateCommunityService } from '@app/features/case-template/services/case-template-community.service';
import { DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-case-template-community-template-page',
  templateUrl: './case-template-community-template-page.component.html',
  styleUrls: ['./case-template-community-template-page.component.scss'],
})
export class CaseTemplateCommunityTemplatePageComponent implements OnInit {
  public template;

  permissions;

  constructor(
    private _caseTemplateCommunityService: CaseTemplateCommunityService,
    private route: ActivatedRoute,
    private _dialogService: DialogService,
    private _toastService: HotToastService,
    private _routerService: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this._caseTemplateCommunityService.getById(params['id']).subscribe((res) => {
        this.template = res.template;
        this.permissions = res.permissions;
      });
    });
  }

  saveTemplate(): void {
    this._dialogService.confirm({
      title: 'Create template',
      body: 'A copy of this template will be added to your firm\'s case templates'
    }).afterClosed$.subscribe((confirm)=> {
      if (confirm) {
        this._caseTemplateCommunityService.saveToFirmTemplates(this.template.id).subscribe(()=> {
          this._toastService.success('Template successfully saved');
        });
      }
    })
  }

  deleteTemplate(): void {
    this._dialogService.confirm({
      title:'Delete template from community',
      body: 'This template will be removed from the community templates. This action is not reversible.'
    }).afterClosed$.subscribe((confirm) => {
      if (confirm) {
        this._caseTemplateCommunityService.delete(this.template.id).subscribe(() => {
          this._toastService.show('Template deleted');
          this._routerService.navigate(['..', 'all'], {relativeTo: this._route});
        });
      }
    });
    
  }
}
