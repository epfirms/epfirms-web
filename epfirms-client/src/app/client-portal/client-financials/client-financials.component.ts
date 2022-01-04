import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-financials',
  templateUrl: './client-financials.component.html',
  styleUrls: ['./client-financials.component.scss']
})
export class ClientFinancialsComponent implements OnInit {
  // states
  paymentInProgress : boolean = false;
  // properties
  currentUser$ : any;
  constructor(private store : Store<{currentUser: any}>) {
      this.currentUser$ = this.store.select('currentUser');
      this.currentUser$.subscribe(res => console.log(res));

   }

  ngOnInit(): void {

  }

}
