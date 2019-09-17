import { AjfWidget, AjfWidgetWithContent } from '@ajf/core/reports';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, HostListener, ViewEncapsulation } from '@angular/core';

import { ReportBuilderComponent } from '../../report-builder/report-builder.component';

function jsonStringify(w: AjfWidget): string {
  return JSON.stringify(w, null, 2);
}

// TODO: editor width should adapt to report
// TODO: implement undo redo
// fix:
// TODO: allow chartType as type
// TODO: automatically add columns in layout if children are not columns?
// fix aggregation

// Base class for widgets.
@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent {
  @Input() name: string;
  @Input() widget: AjfWidget;
  @Input() parent: WidgetComponent;

  constructor(public builder: ReportBuilderComponent, protected cdr: ChangeDetectorRef) { }

  @HostListener('focusin', ['$event'])
  onFocusIn(event: Event) {
    event.stopPropagation();
    this.builder.selectedComponent = this;
  }

  @HostListener('copy', ['$event'])
  onCopy(event: ClipboardEvent) {
    event.stopPropagation();
    const tag = (event.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      return;
    }
    // TODO: json should be indented
    event.clipboardData.setData('text/plain', jsonStringify(this.widget));
    event.preventDefault();
  }
  // TODO: copy paste of columns should have special handling for column width property.
  @HostListener('cut', ['$event'])
  onCut(event: ClipboardEvent) {
    event.stopPropagation();
    const tag = (event.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      return;
    }
    const text = jsonStringify(this.widget);
    const ok = this.delete();
    if (!ok) {
      return;
    }
    event.clipboardData.setData('text/plain', text);
    event.preventDefault();
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

    const parentContent = (this.parent.widget as AjfWidgetWithContent).content;
    const i = parentContent.indexOf(this.widget);
    parentContent.splice(i + 1, 0, w);
    this.parent.markForCheck();
  }

  @HostListener('keyup.delete', ['$event']) onDelete(event: KeyboardEvent) {
    event.stopPropagation();
    const tag = (event.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      return;
    }
    this.delete();
  }

  delete(): boolean {
    try {
      const parentContent = (this.parent.widget as AjfWidgetWithContent).content;
      const i = parentContent.indexOf(this.widget);
      parentContent.splice(i, 1);
      this.parent.markForCheck();
      return true;
    } catch (_) {
      return false;
    }
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

}
