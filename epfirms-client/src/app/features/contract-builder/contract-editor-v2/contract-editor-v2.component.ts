import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract-editor-v2',
  templateUrl: './contract-editor-v2.component.html',
  styleUrls: ['./contract-editor-v2.component.scss'],
})
export class ContractEditorV2Component implements OnInit {
  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      
    ],
  };

  fieldLabels = [
    '@TODAY@',
    '@CLIENT@',
    '@CLIENT_ADDRESS@',
    '@CLIENT_STATE@',
    '@CLIENT_COUNTY@',
    '@CLIENT_CITY@',
    '@CLIENT_ZIPCODE@',

    '@ATTORNEY@',
    '@ATTORNEY_ADDRESS@',
    '@ATTORNEY_STATE@',
    '@ATTORNEY_COUNTY@',
    '@ATTORNEY_CITY@',
    '@ATTORNEY_ZIPCODE@',

    '@LAW_FIRM@',
    '@DESCRIPTION@',

    '@FLAT_RATE_FEE@',
    '@COVERED_ITEMS@',

    '@RETAINER_AMOUNT@',
    '@PRE_SETTLEMENT_CONTINGENCY@',
    '@POST_SETTLEMENT_CONTINGENCY@',
  ];

  // content binding for the editor
  content;
  title: string = 'Template Title Goes Here';
  // the actual quill object
  quill;

  //observable of current user
  currentUser$;
  currentUser;

  constructor(
    private store: Store<{ currentUser: any }>,
    private contractService : ContractService) {
    // grab the current user from the user store and stream Observable
    this.currentUser$ = this.store.select('currentUser');
  }

  ngOnInit(): void {
    this.currentUser$.subscribe((res) => {
      this.currentUser = res;
      console.log('CURRENT USER', this.currentUser);
    });
  }

  updateContent(content): void {
    this.quill = content;
  }

  submit(): void {
    console.log(this.quill);
    let contractTemplate = this.createContractTemplate(this.quill);
    console.log(contractTemplate);
    this.contractService.createTemplate(contractTemplate).subscribe(res => console.log(res));
  }

  createContractTemplate(quillObject): object {
    let contractTemplate = {
      content: this.quill.content,
      title: this.title,
      firm_id: this.currentUser.scope.firm_access.firm_id
    };

    this.fieldLabels.forEach((label) => {
      if (this.quill.text.includes(label)) {
        Object.defineProperty(contractTemplate, `${label.replace(/@/g, '').toLowerCase()}`, {
          value: true,
          enumerable: true
        });
      }
    });
    console.log('CONTRACT TEMPLATE');
    console.log(contractTemplate);
    return contractTemplate;
  }
}
