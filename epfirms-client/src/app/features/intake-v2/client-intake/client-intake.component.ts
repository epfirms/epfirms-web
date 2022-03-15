import { W } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { Asset } from '@app/core/interfaces/asset';
import { Income } from '@app/core/interfaces/income';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { time } from 'console';

@Component({
  selector: 'app-client-intake',
  templateUrl: './client-intake.component.html',
  styleUrls: ['./client-intake.component.scss'],
})
export class ClientIntakeComponent implements OnInit {
  // input bindings
  @Input() intake;  
  @Output() onIntakeSubmit  = new EventEmitter<boolean>();



  //state that manages the views
  state: number = 0;
  // stack that manages the views and enables the back() functionality
  history = [];
  
  // current user
  user;



  // properties for the unprotected asset section
  unprotectedAssets : Asset[] = [];
  
  // list of owners on potential assets
  owners = [];
  

  constructor(
    private currentUserService: CurrentUserService,
    private clientService : ClientService,
    private familyMemberService : FamilyMemberService,
    ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    console.log(this.intake)
  }

  loadCurrentUser(): void {
    this.currentUserService.getCurrentUser().subscribe((res) => {
      this.user = res.user;
    });
  }
  setState(state: number): void {
    this.history.push(this.state);
    this.state = state;
  }
 

  back(): void {
    this.state = this.history.pop();
  }



  addAsset(isProtected : boolean) : void {
    this.unprotectedAssets.push({
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
