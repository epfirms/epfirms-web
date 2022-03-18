import { Component, OnInit } from '@angular/core';
import { Asset } from '@app/core/interfaces/asset';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
// properties for the unprotected asset section
  assets : Asset[] = [];
  
  // list of owners on potential assets
  owners = [];
  constructor() { }

  ngOnInit(): void {
  }
addAsset(isProtected : boolean) : void {
    this.assets.push({
      name: "Enter Name",
    amount : 0,
    type : "Checking",
    is_protected : isProtected,
    owners : {}
    });
  }

  handleOwnerSelection(event, asset, owner) : void {
     if (event.target.checked) {
      asset.owners[owner.id] = owner.first_name;
    }
    else if (!event.target.checked){
      asset.owners[owner.id] = null;
    }
       console.log(asset);

  }
}
