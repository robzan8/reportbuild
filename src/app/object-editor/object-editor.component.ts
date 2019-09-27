import { AjfWidget } from '@ajf/core/reports';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation, OnDestroy } from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-object-editor',
  templateUrl: './object-editor.component.html',
  styleUrls: ['./object-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectEditorComponent implements OnDestroy {

  keyUp = new Subject<KeyboardEvent>();
  private sub: Subscription;
  private pJsonIsValid = true;

  @Input() widget: AjfWidget;
  @Input() objectName: string;

  get object() {
    return this.widget[this.objectName];
  }
  set object(o: any) {
    this.widget[this.objectName] = o;
    this.cdr.markForCheck();
  }

  get jsonIsValid(): boolean {
    return this.pJsonIsValid;
  }
  set jsonIsValid(v: boolean) {
    this.pJsonIsValid = v;
    this.cdr.markForCheck();
  }

  constructor(private cdr: ChangeDetectorRef) {
    this.sub = this.keyUp.pipe(debounceTime(150)).subscribe(e => {
      this.onKeyup(e);
    });
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
    this.object = o;
    this.jsonIsValid = true;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
