import { Component, Input, OnInit } from '@angular/core';
import { Decedent } from '@app/core/interfaces/Decedent';
import { Matter } from '@app/core/interfaces/matter';
import { UserService } from '@app/features/user/services/user.service';
import { DecedentService } from '../services/decedent.service';

@Component({
  selector: 'app-decedent-property',
  templateUrl: './decedent-property.component.html',
  styleUrls: ['./decedent-property.component.scss'],
})
export class DecedentPropertyComponent implements OnInit {
  //Input bindings
  @Input() matter: Matter;

  // get the decedent user profile
  decedentInfo;

  decedent: Decedent;

  constructor(private decedentService: DecedentService, private userService: UserService) {}

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    // check to see if there is a decedent record assosciated with the matter id

    this.decedentService.getDecedentWithMatterId(this.matter.id).subscribe((decedent) => {
      if (decedent) {
        this.decedent = decedent;

        // if there is a decedent record, make the call to the user service to get the decedent user profile
        this.userService.get(decedent.user_id).subscribe((user) => {
          if (user) {
            this.decedentInfo = user;
            console.log("decedentInfo", this.decedentInfo);
            console.log("decedent", this.decedent);
          }
        });
      }
    });
  }
}
