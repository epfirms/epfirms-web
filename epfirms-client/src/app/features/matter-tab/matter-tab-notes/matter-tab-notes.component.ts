import { Component, Input } from '@angular/core';
import { Matter } from '@app/features/matter/matter.model';
import { Observable } from 'rxjs';
import { Staff } from '@app/core/interfaces/staff';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { User as FirebaseUser } from '@angular/fire/auth';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { ConfirmDialogComponent } from '@app/shared/confirm-dialog/confirm-dialog.component';
import { EpModalService } from '@app/shared/modal/modal.service';
import { AuthService } from '@app/features/auth/auth.service';

@Component({
  selector: 'app-matter-tab-notes',
  templateUrl: './matter-tab-notes.component.html',
  styleUrls: ['./matter-tab-notes.component.scss'],
  host: {
    'class': 'flex flex-row-reverse h-full max-w-7xl'
  }
})
export class MatterTabNotesComponent {
  @Input()
  get matter() {
    return this._matter;
  }

  set matter(value: Matter) {
    this._matter = value;
    this.loadNotes(this.matter.id);
  }

  private _matter: Matter;

  note;

  staff$: Observable<Staff[]>;

  currentUser$: Observable<FirebaseUser>;

  matterNotes: any[] = [];

  constructor(
    private _matterService: MatterService,
    private _staffService: StaffService,
    private _modalService: EpModalService,
    private authService: AuthService
  ) {
    this.staff$ = _staffService.entities$;
    this.currentUser$ = this.authService.user$;
  }

  loadNotes(matterId: number) {
    this._matterService.getNotes(matterId).subscribe((notes) => {
      this.matterNotes = notes;
    });
  }

  addNote() {
    this._matterService.addMatterNote(this.matter.id, this.note).subscribe((newNote) => {
      this.note = '';
      this.loadNotes(this.matter.id);
    });
  }

  deleteNote(noteId: number) {
    this._modalService.create({
      epContent: ConfirmDialogComponent,
      epOkText: 'Confirm',
      epCancelText: 'Cancel',
      epAutofocus: null,
      epComponentParams: {
        title: 'Delete note',
        body: 'Are you sure you want to delete this note? This action cannot be undone.'
      },
      epOnOk: () => {
        this._matterService.deleteNote(noteId).subscribe(() => {
          this.loadNotes(this.matter.id);
        });
      }
    });
  }
}
