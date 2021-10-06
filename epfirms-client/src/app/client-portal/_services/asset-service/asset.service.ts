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

  getAssetsByUserId(id: number): Observable<any> {
    return this._http.get<any>(`/api/asset/${id}`);
  }

  addMoneyAccount(userId: number, account): Observable<any> {
    return this._http.post<any>(`/api/asset/money-account/${userId}`, account).pipe();
  }

  addRealEstate(userId: number, realEstate): Observable<any> {
    return this._http.post<any>(`/api/asset/real-estate/${userId}`, realEstate).pipe();
  }

  addVehicle(userId: number, vehicle): Observable<any> {
    return this._http.post<any>(`/api/asset/vehicle/${userId}`, vehicle).pipe();
  }

  updateMoneyAccount(assetId: number, account): Observable<any> {
    return this._http.patch<any>(`/api/asset/money-account/${assetId}`, account).pipe();
  }

  updateRealEstate(assetId: number, realEstate): Observable<any> {
    return this._http.patch<any>(`/api/asset/real-estate/${assetId}`, realEstate).pipe();
  }

  updateVehicle(assetId: number, vehicle): Observable<any> {
    return this._http.patch<any>(`/api/asset/vehicle/${assetId}`, vehicle).pipe();
  }

  deleteMoneyAccount(assetId: number): Observable<any> {
    return this._http.delete<any>(`/api/asset/money-account/${assetId}`).pipe();
  }

  deleteRealEstate(assetId: number): Observable<any> {
    return this._http.delete<any>(`/api/asset/real-estate/${assetId}`).pipe();
  }

  deleteVehicle(assetId: number): Observable<any> {
    return this._http.delete<any>(`/api/asset/vehicle/${assetId}`).pipe();
  }
}
