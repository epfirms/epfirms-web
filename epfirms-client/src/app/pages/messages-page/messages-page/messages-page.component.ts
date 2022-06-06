import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConversationService } from '@app/features/conversation/services/conversation.service';
import { selectSubaccountStatus } from '@app/features/conversation/store/conversation.store';
import { selectRouteParams } from '@app/store/router.selectors';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss'],
})
export class MessagesPageComponent {
  selectedConversationSid$ = this.store.select(selectRouteParams).pipe(map((params) => params.id));

  conversationItems$ = this._conversationService.conversations$;

  subAccountStatus$ = this.store.select(selectSubaccountStatus);

  constructor(
    private store: Store,
    private _conversationService: ConversationService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {}

  setSelectedConversation(sid: string | null = null) {
    if (sid && sid.length) {
      this._router.navigate([`${sid}`], { relativeTo: this._route });
    } else {
      this._router.navigate(['new'], { relativeTo: this._route });
    }
  }
}
