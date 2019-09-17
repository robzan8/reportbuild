import { Component, ViewEncapsulation, ChangeDetectionStrategy,
  Input, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-textinput',
  templateUrl: './textinput.component.html',
  styleUrls: ['./textinput.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextinputComponent implements OnDestroy {

  @Input() value = '';
  @Input() placeholder = '';
  @Input() monospace = false;
  @Output() chchange = new EventEmitter<Event>();
  keyUp = new Subject<Event>();
  private sub: Subscription;

  constructor() {
    this.sub = this.keyUp.pipe(debounceTime(150)).subscribe(event => {
      this.chchange.emit(event);
    });
  }

  onKeyup(e: Event) {
    e.stopPropagation();
    this.keyUp.next(e);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
