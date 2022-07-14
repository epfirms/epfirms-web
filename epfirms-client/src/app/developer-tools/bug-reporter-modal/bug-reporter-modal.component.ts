import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/features/auth/auth.service';

@Component({
  selector: 'app-bug-reporter-modal',
  templateUrl: './bug-reporter-modal.component.html',
  styleUrls: ['./bug-reporter-modal.component.scss']
})
export class BugReporterModalComponent implements OnInit {

  //properties that get passed to the service call
  type: string = 'bug';

  details: string = `### What is happening?\n### What is the expected behavior?\n### What is the actual behavior?`;
  
  reporter;


  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.reporter = user;
      });
  }
}
