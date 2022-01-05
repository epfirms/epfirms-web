import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CaseTemplateCommunityService } from '@app/features/case-template/services/case-template-community.service';

@Component({
  selector: 'app-case-template-community-template-page',
  templateUrl: './case-template-community-template-page.component.html',
  styleUrls: ['./case-template-community-template-page.component.scss'],
})
export class CaseTemplateCommunityTemplatePageComponent implements OnInit {
  public template;

  constructor(
    private _caseTemplateCommunityService: CaseTemplateCommunityService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this._caseTemplateCommunityService.getById(params['id']).subscribe((res) => {
        console.log(res);
        this.template = res;
      });
    });
  }

  saveTemplate(): void {
    this._caseTemplateCommunityService.saveToFirmTemplates(this.template.id).subscribe();
  }
}
