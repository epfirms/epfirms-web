import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '@app/core/interfaces/Transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  // get all transactions for a matter
  getTransactionsWithMatterId(matterId: number): Observable<any> {
    return this.http.get(`/api/transactions/matter/${matterId}`);
  }

  upsertTransaction(transaction: Transaction): Observable<any> {
    return this.http.post(`/api/transactions`, transaction);
  }

  deleteTransaction(transactionId: number): Observable<any> {
    return this.http.delete(`/api/transactions/${transactionId}`);
  }

  getTransaction(transactionId: number): Observable<any> {
    return this.http.get(`/api/transactions/${transactionId}`);
  }
}
