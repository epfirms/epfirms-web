import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/features/auth/auth.service';
import { Matter } from '@app/features/matter/matter.model';
import { selectDenormalizedMatters } from '@app/features/matter/matter.selectors';
import { StatementService } from '@app/shared/_services/statement-service/statement.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User as FirebaseUser } from '@angular/fire/auth';

@Component({
  selector: 'app-client-financials',
  templateUrl: './client-financials.component.html',
  styleUrls: ['./client-financials.component.scss'],
})
export class ClientFinancialsComponent implements OnInit {
  // states
  paymentInProgress: boolean = false;

  // observable properties
  currentUser$: Observable<FirebaseUser>;

  matters$: Observable<Matter[]>;

  // properties
  matterList;

  // dictionary that holds each statement list by case_id key
  matterStatements = {};

  //matter balances due
  matterBalances = {};

  //bindings for child component case-view
  currentStatements;

  displayCaseView: boolean = false;

  currentMatter: any;

  constructor(
    private store: Store,
    private statementService: StatementService,
    private authService: AuthService,
  ) {
    // grab the current user from the user store and stream Observable
    this.currentUser$ = this.authService.user$;

    // get the matters associated with the client
    this.matters$ = this.store.select(selectDenormalizedMatters);
  }

  ngOnInit(): void {
    // subscribe to matter$ and get list of matters associated with client
    this.matters$.subscribe((res) => {
      this.matterList = res;
      //for each matter we need to get the statements that have been generated
      this.matterList.forEach((matter) => {
        this.statementService.getAllByMatterId(matter.id).subscribe((statements) => {
          // assign the statements into the dictionary based on the matter case_id for ease of access
          this.matterStatements[`${matter.case_id}`] = statements;
          this.calculateBalanceDue(matter, statements);
        });
      });
    });
  }

  // this calculates the balance due for each matter/case
  private calculateBalanceDue(matter, statements): void {
    // initialize a balance due
    let balanceDue = 0;
    // iterate through each statement and add it to the balance due for case if
    // it is UNPAID
    statements.forEach((statement) => {
      console.log(statement);
      if (statement.status === 'UNPAID') {
        balanceDue += statement.balance_due;
      }
    });
    this.matterBalances[`${matter.case_id}`] = balanceDue;
  }

  openCaseView(matter): void {
    console.log(matter);
    this.currentStatements = this.matterStatements[matter.case_id];
    this.currentMatter = matter;
    this.displayCaseView = true;
  }
}
