import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tw-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  host: {
    class: 'flex'
  }
})
export class AvatarComponent implements OnInit {
  @Input()
  set twSize(value) {
    this._size = value;
  }
  get twSize() {
    return this._size;
  }

  @Input()
  set twShape(value) {
    this._shape = value;
  }
  get twShape() {
    return this._shape;
  }

  @Input()
  set twSrc(value) {
    this._src = value;
  }
  get twSrc() {
    return this._src;
  }

  @Input()
  set twText(value) {
    this._text = value;
  }
  get twText() {
    return this._text;
  }

  private _shape: 'round' | 'square';
  private _size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  private _src: string | null;
  private _text: string | null;

  constructor() {}

  ngOnInit(): void {}
}
