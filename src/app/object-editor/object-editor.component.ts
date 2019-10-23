import { AjfWidget } from '@ajf/core/reports';
import { Component, Input, ViewEncapsulation, OnDestroy } from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

function jsonStringify(object: any): string {
  return object ? JSON.stringify(object, null, 2) : '';
}

@Component({
  selector: 'app-object-editor',
  templateUrl: './object-editor.component.html',
  styleUrls: ['./object-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ObjectEditorComponent implements OnDestroy {

  // used by the view:
  public text: string;
  public jsonIsValid: boolean;

  private pWidget: AjfWidget;
  @Input() set widget(w: AjfWidget) {
    this.pWidget = w;
    if (this.pObjectName) {
      this.updateViewState();
    }
  }
  get widget() { return this.pWidget; }

  private pObjectName: string;
  @Input() set objectName(name: string) {
    this.pObjectName = name;
    if (this.pWidget) {
      this.updateViewState();
    }
  }
  get objectName() { return this.pObjectName; }

  keyUp = new Subject<KeyboardEvent>();
  private sub: Subscription;

  constructor() {
    this.sub = this.keyUp.pipe(debounceTime(150)).subscribe(e => {
      this.onKeyup(e);
    });
  }

  updateViewState() {
    this.text = jsonStringify(this.widget[this.objectName]);
    this.jsonIsValid = true;
  }

  onKeyup(event: Event) {
    const text = (event.target as HTMLTextAreaElement).value;
    if (text === '') {
      this.jsonIsValid = true;
      return;
    }
    try {
      JSON.parse(text);
    } catch (_) {
      this.jsonIsValid = false;
      return;
    }
    this.jsonIsValid = true;
  }

  onObjectChange(event: Event) {
    const text = (event.target as HTMLTextAreaElement).value;
    if (text === '') {
      delete this.widget[this.objectName];
      this.text = '';
      this.jsonIsValid = true;
      return;
    }
    let o: any;
    try {
      o = JSON.parse(text);
    } catch (_) {
      this.jsonIsValid = false;
      return;
    }
    this.widget[this.objectName] = o;
    this.text = jsonStringify(o);
    this.jsonIsValid = true;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
