import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirmService } from '@app/firm-portal/_services/firm-service/firm.service';
import { Firm } from '@app/core/interfaces/firm';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-firm-details',
  templateUrl: './firm-details.component.html',
  styleUrls: ['./firm-details.component.scss']
})
export class FirmDetailsComponent implements OnInit, OnDestroy {

  firm$ : Observable<Firm[]>;

  firmForm: FormGroup;

  firmSubscription: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _firmService : FirmService
  ) { 
    this.firm$ = _firmService.entities$;
  }

  ngOnInit(): void {

    this.firmSubscription = this.firm$.subscribe(res => {
      
      this.firmForm = this._fb.group({
        id: [res[0].id, [Validators.required]],
        name: [res[0].name, [Validators.required]],
        phone: [res[0].phone, [Validators.email]],
        address: [res[0].address || null],
        city: [res[0].city || null],
        state: [res[0].state || null],
        zip: [res[0].zip || null],
        county: [res[0].county || null],
        description: [res[0].description || null],
        firm_image: [res[0].firm_image || null]
      });

    })
  }

  ngOnDestroy(): void {
    this.firmSubscription.unsubscribe();
  }

  selectEvent(item: any, controlName: string) {
    //this.firmForm.patchValue({[controlName]: item});
    //this.firmForm.updateValueAndValidity();
    //console.log(this.firmForm.value);
  }

  update(): void {
    this._firmService.update(this.firmForm.value).subscribe(res => {
      //const firmData = res.values;
    })
  }

}
