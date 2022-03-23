import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssetService } from '@app/client-portal/_services/asset-service/asset.service';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss']
})
export class RealEstateComponent implements OnInit {

  // Input Bindings
@Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();
  @Input() matter;
 
  
  properties = [];

  // list of owners on potential assets
  owners = [];

  // spouse of client
  spouse;
  constructor(
    private assetService : AssetService
     
    
    ) {}

  ngOnInit(): void {
   

  }
backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }

handleAmount(amount, property) : void {
  property = parseFloat(amount);
}

}
