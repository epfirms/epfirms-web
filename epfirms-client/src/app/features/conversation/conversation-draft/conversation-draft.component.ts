import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Staff } from '@app/core/interfaces/staff';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { Conversation } from '@twilio/conversations';
import { Observable, take } from 'rxjs';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-conversation-draft',
  templateUrl: './conversation-draft.component.html',
  styleUrls: ['./conversation-draft.component.scss'],
})
export class ConversationDraftComponent implements OnInit {
  @Output() conversationFound: EventEmitter<Conversation> = new EventEmitter<Conversation>();

  searchInput: string;

  staffMembers: Staff[] = [];

  filteredStaffMembers: Staff[] = [];

  staff$: Observable<Staff[]>;

  userId: number;

  messageBody: string;

  constructor(
    private _staffService: StaffService,
    private _conversationService: ConversationService,
  ) {
    this.staff$ = this._staffService.entities$;
  }

  ngOnInit(): void {
    this.staff$.pipe(take(1)).subscribe((a) => {
      this.staffMembers = [
        ...a.filter(
          (member) => member.user.id.toString() !== this._conversationService.user.identity,
        ),
      ];
      this.filteredStaffMembers = [...this.staffMembers];
    });
  }

  filterStaffMembers(event) {
    this.filteredStaffMembers =
      event && event.length
        ? this.staffMembers.filter((attorney) =>
            attorney.user.full_name.toLowerCase().includes(event.toLowerCase()),
          )
        : [...this.staffMembers];
  }

  displayFn(value, options): string {
    const selectedAttorney = options.find((option) => option.value === value);
    return selectedAttorney ? selectedAttorney.viewValue : 'Search...';
  }

  async resetFilteredStaffMembers() {
    this.filteredStaffMembers = [...this.staffMembers];
    const existingConversation = await this.findDirectConversation();
    if (existingConversation) {
      this.conversationFound.emit(existingConversation);
    }
  }

  createConversation(): void {
    this._conversationService.createConversation().subscribe((conversation) => {
      this._conversationService
        .addParticipant(conversation, this.userId.toString())
        .subscribe(() => {
          this._conversationService.sendMessage(conversation, this.messageBody).subscribe(() => {
            this.conversationFound.emit(conversation);
          });
        });
    });
  }

  async findDirectConversation() {
    const currentUserIdentity = this._conversationService.user.identity;

    const result = await this.asyncFind(
      this._conversationService.conversations$.value,
      async (conversation) => {
        const attributes = conversation.attributes;

        const participants = await conversation.getParticipants();
        return (
          currentUserIdentity !== this.userId.toString() &&
          attributes.type === 'direct' &&
          participants.length > 1 &&
          participants.some((p) => p.identity === currentUserIdentity) &&
          participants.some((p) => p.identity === this.userId.toString())
        );
      },
    );

    return result;
  }

  async asyncFind(arr, callback) {
    const fail = Symbol();
    return (
      await Promise.all(arr.map(async (item) => ((await callback(item)) ? item : fail)))
    ).find((i) => i !== fail);
  }
}
