import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firm } from '@app/_models/firm';
import { Observable, Subscription } from 'rxjs';
import { FirmService } from '../_services/firm-service/firm.service';

@Component({
  selector: 'app-firm-settings',
  templateUrl: './firm-settings.component.html',
  styleUrls: ['./firm-settings.component.scss'],
  host: {
    'class': 'flex-1'
  }
})
export class FirmSettingsComponent implements OnInit, OnDestroy {
  firm$ : Observable<Firm[]>;

  firmForm: FormGroup;

  firmSubscription: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _firmService : FirmService
  ) { 
    this.firm$ = _firmService.entities$;
    console.log("firm object: ", this.firm$);
  }

  ngOnInit(): void {
    this._firmService.getCurrentFirm().pipe().subscribe(res => {
      console.log("back end firm data: ", res);

      //const firmData = res.values;
    })

    this.firmSubscription = this.firm$.subscribe(res => {
      console.log("response ", res);
      this.firmForm = this._fb.group({
        id: ['', [Validators.required]],
        name: ['', [Validators.required]],
        phone: ['', [Validators.email]],
        email: ['', [Validators.required]],
        address: [null],
        city: [null],
        state: [null],
        zip: [null],
        description: [null],
        firm_image: [null]
      });
    })

    

    console.log("_firmService: ", this._firmService);
  }

  ngOnDestroy(): void {
    this.firmSubscription.unsubscribe();
  }
  
  selectEvent(item: any, controlName: string) {
    console.log(item);
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
