import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ep-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  host: {
    class: 'flex'
  }
})
export class AvatarComponent implements OnInit {
  @Input()
  set epSize(value) {
    this._size = value;
  }
  get epSize() {
    return this._size;
  }

  @Input()
  set epShape(value) {
    this._shape = value;
  }
  get epShape() {
    return this._shape;
  }

  @Input()
  set epSrc(value) {
    this._src = value;
  }
  get epSrc() {
    return this._src;
  }

  @Input()
  set epText(value) {
    this._text = value;
  }
  get epText() {
    return this._text;
  }

  private _shape: 'round' | 'square';
  private _size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  private _src: string | null;
  private _text: string | null;

  constructor() {}

  ngOnInit(): void {}
}
