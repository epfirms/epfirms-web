import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '@app/core/interfaces/document';

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  constructor(private _http : HttpClient) { }

  getPresignedUrl(userId, docType, docName) : Observable<any>{
    const body = {
      userId: userId,
      docType: docType,
      docName: docName
    };

    return this._http.post('/api/aws/generate', body);
  }

  // Upload to S3
  uploadfileAWSS3(fileuploadurl, contenttype, file): Observable<any> {

    const headers = new HttpHeaders({ 'Content-Type': contenttype, 'Access-Control-Allow-Origin': '*' });
    const req = new HttpRequest(
      'PUT',
      fileuploadurl,
      file,
      {
        headers: headers,
        reportProgress: false
      });

    return this._http.request(req);
  }

  deleteDocument(document): Observable<any> {

    return this._http.post("/api/aws/delete", document);
  }

  deleteStaff(staff): Observable<any> {

    return this._http.post("http://localhost:4000/api/aws/delete", staff);
  }

  downLoadDocument(key: string): Observable<any> {
    return this._http.post("/api/aws/download", {key})
  }

  updateDocument(sourceKey: string, updatedValues): Observable<any> {
    return this._http.put("/api/aws/update", {source: sourceKey, updatedValues: updatedValues});
  }
}
