import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LegalAreaService } from '@app/firm-portal/_services/legal-area-service/legal-area.service';
import { Firm } from '@app/_models/firm';
import { LegalArea } from '@app/_models/legal-area';
import { Observable } from 'rxjs';
import colors from '@app/_util/legalAreaColors';
//import { FirmService } from '../_services/firm-service/firm.service';

@Component({
  selector: 'app-legal-areas',
  templateUrl: './legal-areas.component.html',
  styleUrls: ['./legal-areas.component.scss']
})
export class LegalAreasComponent implements OnInit {
  firm$ : Observable<Firm[]>;

  firmForm: FormGroup;

  legalAreas$: Observable<LegalArea[]>;

  newLegalArea: LegalArea = {
    name: '',
    color: 'gray'
  };

  colorOptions = colors;

  createLegalArea: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _legalAreaService: LegalAreaService
  ) { 
    this.legalAreas$ = _legalAreaService.entities$;
  }

  ngOnInit(): void {
    this.newLegalArea.color = this.randomColor();
  }

  randomColor() {
    return this.colorOptions[Math.floor(Math.random() * this.colorOptions.length)].name;
  }

  add(): void {
    this.createLegalArea = true;
  }

  update(): void {
    //this._firmService.update;
  }

  updateNewLegalArea(value, property) {
    this.newLegalArea = {
      ...this.newLegalArea,
      [property]: value
    }
  }

  save() {
    this._legalAreaService.create(this.newLegalArea).subscribe(() => {
      this.createLegalArea = false;

      this.newLegalArea = {
        name: '',
        color: this.randomColor()
      }
    });
  }

  remove(id: number) {
    this._legalAreaService.deleteLegalArea(id).subscribe();
  }
}
