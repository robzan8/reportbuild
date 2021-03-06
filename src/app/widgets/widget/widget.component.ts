import { AjfWidget, AjfWidgetWithContent, AjfWidgetType, AjfLayoutWidget } from '@ajf/core/reports';
import { Component, Input, HostListener, ViewEncapsulation } from '@angular/core';

import { ReportBuilderComponent } from '../../report-builder/report-builder.component';

function jsonStringify(c: WidgetComponent): string {
  let w = c.widget;
  if (w.widgetType === AjfWidgetType.Column) {
    const parent = c.parent.widget as AjfLayoutWidget;
    const i = parent.content.indexOf(w);
    const flexGrow = parent.columns[i];
    w = {...w, flexGrow} as any;
  }
  return JSON.stringify(w, null, 2);
}

// Base class for widgets.
@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WidgetComponent {
  @Input() name: string;
  @Input() widget: AjfWidget;
  @Input() parent: WidgetComponent;

  constructor(public builder: ReportBuilderComponent) { }

  @HostListener('focusin', ['$event'])
  onFocusIn(event: Event) {
    event.stopPropagation();
    this.builder.selectedWidget = this.widget;
    this.builder.selectedWidgetName = this.name;
  }

  @HostListener('copy', ['$event'])
  onCopy(event: ClipboardEvent) {
    event.stopPropagation();
    const tag = (event.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      return;
    }
    event.clipboardData.setData('text/plain', jsonStringify(this));
    event.preventDefault();
  }
  @HostListener('cut', ['$event'])
  onCut(event: ClipboardEvent) {
    event.stopPropagation();
    const tag = (event.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      return;
    }
    const text = jsonStringify(this);
    const ok = this.delete();
    if (!ok) {
      return;
    }
    event.clipboardData.setData('text/plain', text);
    event.preventDefault();
    this.builder.resetSelection();
    this.builder.onChange();
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.stopPropagation();
    const tag = (event.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      return;
    }
    event.preventDefault();
    const w = JSON.parse(event.clipboardData.getData('text/plain'));

    const parent = this.parent.widget as AjfWidgetWithContent;
    const i = parent.content.indexOf(this.widget) + 1;
    if (w.widgetType === AjfWidgetType.Column) {
      const flexGrow = w.flexGrow || -1;
      delete w.flexGrow;
      (parent as AjfLayoutWidget).columns.splice(i, 0, flexGrow);
    }
    parent.content.splice(i, 0, w);
    this.builder.onChange();
  }

  @HostListener('keyup.delete', ['$event']) onDelete(event: KeyboardEvent) {
    event.stopPropagation();
    const tag = (event.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      return;
    }
    this.delete();
    this.builder.resetSelection();
    this.builder.onChange();
  }

  delete(): boolean {
    try {
      const parent = this.parent.widget as AjfWidgetWithContent;
      const i = parent.content.indexOf(this.widget);
      parent.content.splice(i, 1);
      if (parent.widgetType === AjfWidgetType.Layout) {
        (parent as AjfLayoutWidget).columns.splice(i, 1);
      }
      return true;
    } catch (_) {
      return false;
    }
  }

}
