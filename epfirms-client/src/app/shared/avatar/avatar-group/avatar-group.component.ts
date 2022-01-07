import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ep-avatar-group',
  templateUrl: './avatar-group.component.html',
  styleUrls: ['./avatar-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'flex -space-x-1 relative z-0 overflow-hidden ep-avatar-group'
  }
})
export class AvatarGroupComponent {}
