import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { filter, skip, switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { EditableEditDirective } from '../directives/editable-edit.directive';
import { EditableViewDirective } from '../directives/editable-view.directive';

@Component({
  selector: 'ep-editable',
  templateUrl: './editable.component.html',
  styles: [':host {cursor: pointer;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableComponent implements OnInit, OnDestroy {
  @ContentChild(EditableViewDirective) viewContent: EditableViewDirective;

  @ContentChild(EditableEditDirective) editContent: EditableEditDirective;

  private readonly _editMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly editMode$: Observable<boolean> = this._editMode.asObservable();

  public viewHandler: Subscription;

  public editHandler: Subscription;
  
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly el: ElementRef) { }

  ngOnInit(): void {
    this.handleViewMode();
    this.handleEditMode();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Caretaker note: we're explicitly setting these subscriptions to `null` since this actually will be closed subscriptions,
    // but they still keep referencing `destination`'s, which are `SafeSubscribers`. Destinations keep referencing `next` functions,
    // which are `() => this.displayEditMode()` and `() => this.saveEdit()`.
    // Since `next` functions capture `this`, this leads to a circular reference preventing the `EditableComponent` from being GC'd.
    this.editHandler = null;
    this.viewHandler = null;
  }

  private handleViewMode(): void {
    this.viewHandler = fromEvent(this.hostElement, 'click')
      .pipe(
        withLatestFrom(this.editMode$),
        filter(([_, editMode]) => !editMode),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.displayEditMode());
  }

  private handleEditMode(): void {
    const clickOutside$ = (editMode: boolean) =>
      fromEvent(document, 'click').pipe(
        filter(() => editMode),
        /*
        skip the first propagated event if there is a nested node in the viewMode templateRef
        so it doesn't trigger this eventListener when switching to editMode
         */
        skip(1),
        filter(({ target }) => this.hostElement.contains(target) === false),
        take(1)
      );

    this.editHandler = this.editMode$
      .pipe(
        switchMap((editMode: boolean) => clickOutside$(editMode)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.leaveEditMode());
  }

  public displayEditMode(): void {
    this._editMode.next(true);
  }

  private leaveEditMode(): void {
    this._editMode.next(false);
    this.viewHandler.unsubscribe();
    setTimeout(() => this.handleViewMode(), 0);
  }

  private get hostElement(): any {
    return this.el.nativeElement;
  }
}
