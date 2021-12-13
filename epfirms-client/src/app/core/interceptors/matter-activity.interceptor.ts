import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatterActivityService } from '../../shared/_services/matter-activity-service/matter-activity.service';

@Injectable()
export class MatterActivityInterceptor implements HttpInterceptor {

  //regex matchers
  documentPattern = new RegExp('/document/');
  matterTaskPattern = new RegExp('/matters/task');

  constructor(
    private matterActivityService : MatterActivityService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //handle document requests and generate matter activity
    let isDocument = request.url.search(this.documentPattern);
    if (isDocument !== -1){
      if (request.method == "PUT"){
        this.matterActivityService.createDocumentUpdate(request.body);
      }
      else if (request.method == "POST"){
        this.matterActivityService.createDocumentCreation(request.body);
      }
    }

    //handle matter tasks
    let isMatterTask = request.url.search(this.matterTaskPattern);
    if (isMatterTask !== -1) {
      if (request.method == "POST"){
        this.matterActivityService.createMatterTaskCreation(request.body);
      }
      else if (request.method == "PATCH"){
        this.matterActivityService.createMatterTaskUpdate(request.body);
      }
    }


    return next.handle(request);
  }
}
