import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class emailService {

  constructor(
    private _http: HttpClient,
  ) {

  }

  /*
  sendReview
    Inputs:
      matter: A matter, like a case or lead.
    Outputs:
      The result of the post request to the API.
    Function:
      Sends a request to the emails API module, to send a review email for a specific matter.
      It sends the entire matter, and lets the server handle dissection.
  */
  sendReview(matter) {
    return this._http.post<any>('/api/emails/sendReview', matter);
  }
}
