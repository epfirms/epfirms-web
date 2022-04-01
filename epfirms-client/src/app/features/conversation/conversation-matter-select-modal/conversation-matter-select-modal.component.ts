import { Component, OnInit } from '@angular/core';
import { TeamService } from '@app/features/team/services/team.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { EpModalRef } from '@app/shared/modal/modal-ref';

@Component({
  selector: 'app-conversation-matter-select-modal',
  templateUrl: './conversation-matter-select-modal.component.html',
  styleUrls: ['./conversation-matter-select-modal.component.scss']
})
export class ConversationMatterSelectModalComponent implements OnInit {
  clientUserId: number;

  matters: any[] = [];

  selectedMatter: any;

  constructor(
    private _matterService: MatterService,
    private _teamService: TeamService,
    private _modalRef: EpModalRef
  ) { }

  ngOnInit(): void {
    this._teamService.getAllByUserId("me").subscribe(res => {
      console.log(res);
      this._matterService.getClientMatters(this.clientUserId).subscribe((matters) => {
        this.matters = matters.filter((matter) => matter.status === "active");
      });
    });
  }

  selectMatter(matter) {
    this.selectedMatter = matter;
    this.updateModalConfig();
  }

  updateModalConfig() {
    const config = this._modalRef.getConfig();
    this._modalRef.updateConfig({
      ...config,
      epOkDisabled: !this.selectedMatter
    });
  }

}
