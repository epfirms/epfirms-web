import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit, OnDestroy {
  
  documents;
  searchValue = new FormControl('');
  filtered = [];
  searchSubscription: Subscription;
  constructor() { }

  ngOnInit(): void {
    this.filterBySearch()
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  filterBySearch(): void {
    this.searchSubscription = this.searchValue.valueChanges.pipe().subscribe((onChange) => {
      this.filtered = this.documents.filter(
        (doc) => doc.name.toLowerCase().indexOf(onChange.toLowerCase()) === 0
      );
    });
  }
}
