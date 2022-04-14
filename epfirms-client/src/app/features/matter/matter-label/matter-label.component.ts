import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';
import { User } from '@app/features/user/interfaces/user';

@Component({
  selector: 'app-matter-label',
  templateUrl: './matter-label.component.html',
  styleUrls: ['./matter-label.component.scss']
})
export class MatterLabelComponent implements OnInit {
  @Input() client: User;

  @Input() spouse?: User;

  @Input() matter: Matter;

  @Input() epSize: 'xs' | 'sm' | 'md' = 'md';

  constructor() { }

  ngOnInit(): void {
  }

}
