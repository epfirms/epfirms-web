import { Component, Input, OnInit } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { Asset } from '@app/core/interfaces/asset';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit {
  // Input Bindings
  @Input() matter;
  // properties for the unprotected asset section
  assets: Asset[] = [];

  // list of owners on potential assets
  owners = [];

  // spouse of client
  spouse;
  constructor(private familyMemberService: FamilyMemberService) {}

  ngOnInit(): void {
    this.owners.push(this.matter.client);
    this.loadSpouse();


  }
  addAsset(isProtected: boolean): void {
    this.assets.push({
      name: 'Enter Name',
      amount: 0,
      type: 'Checking',
      is_protected: isProtected,
      owners: {},
    });
  }

  handleOwnerSelection(event, asset, owner): void {
    if (event.target.checked) {
      asset.owners[owner.id] = true;
    } else if (!event.target.checked) {
      asset.owners[owner.id] = false;
    }
    console.log(asset);
  }
  loadSpouse(): void {
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe((res) => {
      console.log(res);
      this.spouse = res.filter((member) => member.family_member.relationship_type === 'spouse')[0];
      this.owners.push(this.spouse);
    });
  }
}
