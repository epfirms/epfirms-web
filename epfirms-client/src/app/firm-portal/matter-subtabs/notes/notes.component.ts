import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/_models/matter';
import { MatterService } from '../../_services/matter-service/matter.service';
import { Observable, Subscription } from 'rxjs';
import { MatterTabsService } from '@app/firm-portal/_services/matter-tabs-service/matter-tabs.service';
import { FirmService } from '@app/firm-portal/_services/firm-service/firm.service';
import { MatterTab } from '@app/_models/matter-tab';
import { Staff } from '@app/_models/staff';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
  @Input() 
  get matter() {
    return this._matter;
  }
  set matter(value: Matter) {
    this._matter = value;
  };
  
  private _matter: Matter;

  note: String = ""
  
  staff$: Observable<Staff[]>;

  currentUser$: Observable<any>;

  constructor(
    private _matterService: MatterService,
    private _staffService: StaffService,
    private _currentUserService: CurrentUserService,
    ) {
      this.staff$ = _staffService.entities$;
      this.currentUser$ = _currentUserService.user$;
     }

  /*
    addNote()
      Inputs:
        this.comment: This is the string that's typed into the text-area in the HTML.

      Outputs:
        user_id: The id of the user making the comment.
        matter_id: The id of the matter (case, lead, etc), that the comment is related to.
        note_string: The actual content of the comment, in the form of a String.
        note: The actual object, combining the previous parts into 1 object to pass onto the backend, through the _matterService.
  */
  addNote() {
    const note = {
      matter_id: this.matter.id,
      note_string: this.note
    };

    this.note = ""
    this._matterService.addMatterNote(note).subscribe()
  }

}
