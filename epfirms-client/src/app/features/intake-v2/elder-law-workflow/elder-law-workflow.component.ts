import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';
import { UserService } from '@app/features/user/services/user.service';
import { WardService } from '../services/ward.service';

@Component({
  selector: 'app-elder-law-workflow',
  templateUrl: './elder-law-workflow.component.html',
  styleUrls: ['./elder-law-workflow.component.scss'],
})
export class ElderLawWorkflowComponent implements OnInit {
  // input bindings
  @Input() matter: Matter;

  // state that manages the views
  state: string = 'caregiver';

  // caregiver
  ward;

  constructor(private wardService: WardService, private userService: UserService) {}

  ngOnInit(): void {
    this.wardService.getWardWithMatterId(this.matter.id).subscribe((response) => {
      if (response) {
        console.log('loadClient', response);
        this.userService.get(response.user_id).subscribe((user) => {
          if (user) {
            this.ward = user;
          }
        });
      }
    });
  }

  setState(state: string): void {
    this.state = state;
  }
}
