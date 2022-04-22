import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssetService } from '@app/client-portal/_services/asset-service/asset.service';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { Asset } from '@app/core/interfaces/asset';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit {
  // Input Bindings
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();
  @Input() matter;


  // spouse of client
  spouse;
  constructor(
    private familyMemberService: FamilyMemberService,
  ) {}

  ngOnInit(): void {
  }
  
  


  
  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }

  
}
