import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Staff } from '@app/core/interfaces/staff';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { Observable, take } from 'rxjs';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-creation-window',
  templateUrl: './chat-creation-window.component.html',
  styleUrls: ['./chat-creation-window.component.scss']
})
export class ChatCreationWindowComponent implements OnInit {
  @Output() closed: EventEmitter<void> = new EventEmitter<void>();

  @Output() create: EventEmitter<{body: string, userId: string}> = new EventEmitter<{body: string, userId: string}>();

  searchInput: string;

  staffMembers: Staff[] = [];

  filteredStaffMembers: Staff[] = [];

  staff$: Observable<Staff[]>;

  userId: number;

  messageBody: string;

  constructor(private _staffService: StaffService, private _chatService: ChatService) { 
    this.staff$ = this._staffService.entities$;
  }

  ngOnInit(): void {
    this.staff$.pipe(take(1)).subscribe((a) => {
      this.staffMembers = [...a];
      this.filteredStaffMembers = [...a];
    });
  }

  closeWindow() {
    this.closed.emit();
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

  resetFilteredStaffMembers() {
    this.filteredStaffMembers = [...this.staffMembers];
  }

  createConversation() {
    this.create.emit({body: this.messageBody, userId: this.userId.toString()});
  }
}
