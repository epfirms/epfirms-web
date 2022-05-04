import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';

@Component({
  selector: 'app-bug-reporter-modal',
  templateUrl: './bug-reporter-modal.component.html',
  styleUrls: ['./bug-reporter-modal.component.scss']
})
export class BugReporterModalComponent implements OnInit {

  //properties that get passed to the service call
  type: string = 'bug';
  details: string = `### What is happening?\n### What is the expected behavior?\n### What is the actual behavior?
  `;
  
  reporter;


  constructor(private currentUserService : CurrentUserService) { 
    
  }

  ngOnInit(): void {
    this.currentUserService.getCurrentUser().subscribe(({user}) => {
      this.reporter = user;
      console.log("current user", this.reporter);
      });
  }


}
