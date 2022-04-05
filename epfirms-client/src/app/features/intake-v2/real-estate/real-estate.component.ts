import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssetService } from '@app/client-portal/_services/asset-service/asset.service';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss'],
})
export class RealEstateComponent implements OnInit {
  // Input Bindings
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();
  @Input() matter;

  properties = [];

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {
    this.loadProperties();
  }
  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }

  handleLoanBalance(amount, property): void {
    property.loan_amount = parseFloat(amount);
  }
  handleTotalValue(amount, property): void {
    property.total_value = parseFloat(amount);
  }
  addProperty(): void {
    this.properties.push({
      full_address: '',
      loan_amount: 0,
      total_value: 0,
      is_business: false,
      has_mineral_rights: false
    });
  }

  loadProperties(): void {
    this.assetService.getAssetsByUserId(this.matter.client.id).subscribe((res) => {
      console.log("real estate", res);
      this.properties = res.real_estate;
    });
  }

  submit(): void {
    console.log(this.properties);
    this.properties.forEach((property) => {
      this.assetService.addRealEstate(this.matter.client.id, property).subscribe();
    });
    this.continueButton();
  }
}
