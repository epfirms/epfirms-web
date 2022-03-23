import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssetService } from '@app/client-portal/_services/asset-service/asset.service';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { Asset } from '@app/core/interfaces/asset';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit {
  // Input Bindings
@Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();
  @Input() matter;
  // properties for the unprotected asset section
  assets: Asset[] = [];

  // list of owners on potential assets
  owners = [];

  // spouse of client
  spouse;
  constructor(
    private familyMemberService: FamilyMemberService,
    private assetService : AssetService
     
    
    ) {}

  ngOnInit(): void {
    this.owners.push(this.matter.client);
    this.loadSpouse();
    this.loadAssets();


  }
  addAsset(isProtected: boolean): void {
    this.assets.push({
      institution: '',
      balance: 0,
      type: 'Checking',
      is_joint: false,
      user_id : this.matter.client.id
    });

  }

  loadAssets() : void {
    this.assetService.getAssetsByUserId(this.matter.client.id).subscribe(res => {
       this.assets = res.money_account;
    });
  }

 

 
  loadSpouse(): void {
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe((res) => {
      console.log(res);
      this.spouse = res.filter((member) => member.family_member.relationship_type === 'spouse')[0];
      this.owners.push(this.spouse);
    });
  }

  submit() : void {
    this.assets.forEach(asset => {
      this.assetService.addMoneyAccount(this.matter.client.id, asset).subscribe(res => console.log(res));
    });
    this.continueButton();
  }
backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }
}
