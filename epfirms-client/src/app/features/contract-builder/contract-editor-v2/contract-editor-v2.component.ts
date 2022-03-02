import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract-editor-v2',
  templateUrl: './contract-editor-v2.component.html',
  styleUrls: ['./contract-editor-v2.component.scss'],
})
export class ContractEditorV2Component implements OnInit {
  @Input() inputContent;
  @Output() isVisibleChange = new EventEmitter<boolean>();

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

  templateVars = {
                "@TODAY@":"Inserts todays date.",
                "@CLIENT@":"Inserts list of clients on the case.",
                "@CLIENT_ADDRESS@":"Inserts client street address.",
                "@CLIENT_STATE@":"Inserts client state.",
                "@CLIENT_COUNTY@":"Inserts client county.",
                "@CLIENT_CITY@":"Inserts client city.",
                "@CLIENT_ZIPCODE@":"Inserts client zipcode.",

                "@ATTORNEY@":"Inserts list of clients on the case.",
                "@ATTORNEY_ADDRESS@":"Inserts attorney street addres",
                "@ATTORNEY_STATE@":"Inserts attorney state.",
                "@ATTORNEY_COUNTY@":"Inserts attorney county.",
                "@ATTORNEY_CITY@":"Inserts attorney city.",
                "@ATTORNEY_ZIPCODE@":"Inserts attorney zipcode.",
                
                "@LAW_FIRM@":"Inserts name of law firm.",
                "@DESCRIPTION@":"Inserts description of case.",

                "@FLAT_RATE_FEE@ ":"Inserts flat rate fee.",
                "@COVERED_ITEMS@":"Inserts numerical list of covered items.",
                

                "@RETAINER_AMOUNT@":"Inserts retainer amount.",
                "@PRE_SETTLEMENT_CONTINGENCY@":"Inserts pre-settlement contingecy rate.",
                "@POST_SETTLEMENT_CONTINGENCY@":"Inserts post-settlement contingecy rate.",
    
  }

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
    if (this.inputContent !== undefined){
      this.content = this.inputContent.content;
      

    }
    this.currentUser$.subscribe((res) => {
      this.currentUser = res;
    });
  }

  updateContent(content): void {
    
    this.quill = content;
  }

  submit(): void {
    let contractTemplate = this.createContractTemplate(this.quill);
    this.contractService.createTemplate(contractTemplate).subscribe(res => this.close());
  }

  createContractTemplate(quillObject): object {
    let contractTemplate = {
      id: undefined,
      content: this.content,
      title: this.title,
      firm_id: this.currentUser.scope.firm_access.firm_id
    };

    if (this.inputContent !== undefined) {
      contractTemplate.id = this.inputContent.id;
    }

    this.fieldLabels.forEach((label) => {
      if (this.quill.text.includes(label)) {
        Object.defineProperty(contractTemplate, `${label.replace(/@/g, '').toLowerCase()}`, {
          value: true,
          enumerable: true
        });
      }
    });
    return contractTemplate;
  }

  close():void {
    this.isVisibleChange.emit(false);
  }
}
