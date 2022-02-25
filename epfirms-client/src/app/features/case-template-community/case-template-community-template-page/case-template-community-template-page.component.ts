import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CaseTemplateCommunityService } from '@app/features/case-template/services/case-template-community.service';
import { ConfirmDialogComponent } from '@app/shared/confirm-dialog/confirm-dialog.component';
import { EpModalService } from '@app/shared/modal/modal.service';
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
    private _modalService: EpModalService,
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
    this._modalService.create({
      epContent: ConfirmDialogComponent,
      epOkText: 'Confirm',
      epCancelText: 'Cancel',
      epAutofocus: null,
      epComponentParams: {
        title: 'Create template',
        body: `A copy of this template will be added to your firm\'s case templates`
      },
      epOnOk: () => {
        this._caseTemplateCommunityService.saveToFirmTemplates(this.template.id).subscribe(()=> {
          this._toastService.success('Template successfully saved');
        });
      }
    });
  }

  deleteTemplate(): void {
    this._modalService.create({
      epContent: ConfirmDialogComponent,
      epOkText: 'Confirm',
      epCancelText: 'Cancel',
      epAutofocus: null,
      epComponentParams: {
        title:'Delete template from community',
        body: 'This template will be removed from the community templates. This action is not reversible.'
      },
      epOnOk: () => {
        this._caseTemplateCommunityService.delete(this.template.id).subscribe(() => {
          this._toastService.show('Template deleted');
          this._routerService.navigate(['..', 'all'], {relativeTo: this._route});
        });
      }
    });   
  }
}
