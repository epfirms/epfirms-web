import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  constructor(private _http: HttpClient) { }

  getAll(): Observable<any> {
    return this._http.get<any>('/api/asset').pipe();
  }

  addMoneyAccount(account): Observable<any> {
    return this._http.post<any>('/api/asset/money-account', account).pipe();
  }

  addRealEstate(realEstate): Observable<any> {
    return this._http.post<any>('/api/asset/real-estate', realEstate).pipe();
  }

  addVehicle(vehicle): Observable<any> {
    return this._http.post<any>('/api/asset/vehicle', vehicle).pipe();
  }
}
