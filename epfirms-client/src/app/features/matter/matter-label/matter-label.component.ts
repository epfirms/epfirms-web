import { Component, Input } from '@angular/core';
import { Matter } from '@app/features/matter/matter.model';
import { User } from '@app/features/user/interfaces/user';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-matter-label',
  templateUrl: './matter-label.component.html',
  styleUrls: ['./matter-label.component.scss']
})
export class MatterLabelComponent {
  @Input() client: User;

  @Input() spouse?: User;

  @Input() set matter(value) {
    this.descriptionChange = value.title;
    this._matter = value;
  };

  get matter() {
    return this._matter;
  }

  @Input() epSize: 'xs' | 'sm' | 'md' = 'md';

  editDescription: boolean = false;

  descriptionChange: string;

  private _matter: Matter;

  constructor(private _matterService: MatterService, private _toastService: HotToastService) { }

  toggleEditDescription() { 
    this.descriptionChange = this.matter.title;
    this.editDescription = !this.editDescription;
  }

  saveChanges() {
    this._matterService.update({ id: this.matter.id, title: this.descriptionChange }).subscribe(() => {this.toggleEditDescription(); this._toastService.show('Saved', {'theme': 'snackbar', position: 'bottom-center'})});
  }

  cancelChanges() {
    this.descriptionChange = this.matter.title;
    this.editDescription = false;
  }
}
