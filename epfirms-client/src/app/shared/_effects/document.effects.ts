import { Injectable } from '@angular/core';
import { MatterActivity } from '@app/_models/matter-activity';
import { EntityOp, ofEntityOp, ofEntityType } from '@ngrx/data';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MatterActivityService } from '../_services/matter-activity-service/matter-activity.service';

@Injectable()
export class DocumentEffects {


  constructor(
    private actions$: Actions,
    private _matterActivityService : MatterActivityService
  ) {}

  //effect that is called when a document is created.
  // this makes a record of the change in the MatterActivity table in the db
  createDocumentEffect = createEffect(() => this.actions$.pipe(
    ofEntityType("Document"),
    ofEntityOp([EntityOp.SAVE_ADD_ONE_SUCCESS]),
    map(action => {
      console.log(action);
      // create matter activity object
      let matterActivity = new MatterActivity(action.payload.data.user_id, action.payload.data.matter_id,
         "document", "add", action.payload.data.doc_name);
      this._matterActivityService.create(matterActivity).subscribe();
    }),

  ), {dispatch: false});

  // create a matter activity when a document is updated
  updateDocumentEffect = createEffect(() => this.actions$.pipe(
    ofEntityType("Document"),
    ofEntityOp([EntityOp.SAVE_UPDATE_ONE_SUCCESS]),
    map(action => {
      console.log(action);
      let changes = action.payload.data.changes;
      // create matter activity object
      let matterActivity = new MatterActivity(changes.user_id, changes.matter_id,
         "document", "update", `${changes.doc_name}, ${changes.doc_type}, ${changes.share_with}`);
      this._matterActivityService.create(matterActivity).subscribe();
    }),

  ), {dispatch: false});

  
}
