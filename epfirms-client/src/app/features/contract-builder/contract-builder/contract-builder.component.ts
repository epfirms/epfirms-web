import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-builder',
  templateUrl: './contract-builder.component.html',
  styleUrls: ['./contract-builder.component.scss']
})
export class ContractBuilderComponent implements OnInit {

  //state for the actual contract editor
  isCreateMode : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleCreateMode() : void {
    this.isCreateMode = true;
  }

}
