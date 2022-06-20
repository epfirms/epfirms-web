import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientSubscription } from '@app/core/interfaces/ClientSubscription';
import { Matter } from '@app/core/interfaces/matter';
import { currencyInputMask, toFloat } from '@app/core/util/currencyUtils';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { EpModalRef } from '@app/shared/modal/modal-ref';
import { StripeService } from '@app/shared/_services/stripe-service/stripe.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, take } from 'rxjs';
import { ClientSubscriptionService } from '../../services/client-subscription.service';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-create-subscription-overlay',
  templateUrl: './create-subscription-overlay.component.html',
  styleUrls: ['./create-subscription-overlay.component.scss'],
})
export class CreateSubscriptionOverlayComponent implements OnInit {
  currencyMask = currencyInputMask;
  matters$: Observable<Matter[]>;

  matters: Matter[] = [];

  //list of matters in option format
  matterOptions: any[] = [];

  // the currently selected matter
  selectedMatter: Matter;

  // the invoice form
  subscriptionForm = new FormGroup({
    amount: new FormControl('', Validators.required),
    start_date: new FormControl('', Validators.required),
    subscription_description: new FormControl('', Validators.required),
    term: new FormControl(12, Validators.required),
  });

  // terms: number of month options
  terms: number[] = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30];

  constructor(
    private _modalRef: EpModalRef,
    private _matterService: MatterService,
    private _toastService: HotToastService,
    private _invoiceService: InvoiceService,
    private _stripeService: StripeService,
    private _clientSubscriptionService: ClientSubscriptionService,
  ) {
    this.matters$ = this._matterService.filteredEntities$;
  }

  ngOnInit(): void {
    this.loadMatters();
  }

  loadMatters(): void {
    this.matters$.pipe(take(1)).subscribe((matters) => {
      if (matters) {
        this.matters = matters;
        this.createMatterOptionsList();
      }
    });
  }

  private createMatterOptionsList(): void {
    this.matterOptions = this.matters.map((matter) => {
      return {
        label: matter.title + ' - ' + matter.client.full_name,
        value: matter.id,
      };
    });
  }

  close() {
    this._modalRef.close();
  }

  onSelectedMatter(matterId: number) {
    this.selectedMatter = this.matters.find((matter) => matter.id === matterId);
  }

  // rounds the term down because we only want positive integers
  roundTerm(): void {
    let term = this.subscriptionForm.value.term;
    term = Math.floor(term);
    term = term * -1 * -1;
    this.subscriptionForm.patchValue({ term: term });
  }

  submit(isDraft: boolean): void {
    try {
      if (toFloat(this.subscriptionForm.value.amount) > 999999) {
        this._toastService.error('The amount cannot be greater than $999,999.99');

        throw new Error('The amount cannot be greater than $999,999.99');
      }

      if (Date.now() > new Date(this.subscriptionForm.value.start_date).getTime()) {
        this._toastService.error('The due date must be in future');
        throw new Error('The due date must be in future');
      }
      //creat a new subscription
      if (this.selectedMatter && this.subscriptionForm.valid) {
        let subscription = new ClientSubscription(
          this.selectedMatter.client.id,
          this.selectedMatter.firm_id,
          this.selectedMatter.id,
          this.subscriptionForm.value.subscription_description,
          this.subscriptionForm.value.term,
          new Date(this.subscriptionForm.value.start_date),
          Math.floor(toFloat(this.subscriptionForm.value.amount)),
        );

        this._clientSubscriptionService
          .createSubscription(subscription)
          .subscribe((subscription) => {
            if (subscription) {
              this._stripeService
                .createClientSubscription(subscription[0].id)
                .subscribe((stripeSubscription) => {
                  if (stripeSubscription) {
                    this._toastService.success('Subscription created successfully');
                    this.close();
                  }
                });
            }
          });
      } else {
        this._toastService.error('Please select a matter and fill out the form correctly.');
      }
    } catch (error) {
      console.error(error);
    }
  }
}
