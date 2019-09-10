import { AjfWidget, AjfWidgetWithContent } from '@ajf/core/reports';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, HostListener, ViewEncapsulation } from '@angular/core';

import { ReportBuilderComponent } from '../../report-builder/report-builder.component';

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

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.stopPropagation();
    this.builder.selectedComponent = this;
  }
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
    event.clipboardData.setData('text/plain', JSON.stringify(this.widget));
    event.preventDefault();
  }
  @HostListener('cut', ['$event'])
  onCut(event: ClipboardEvent) {
    event.stopPropagation();
    const tag = (event.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      return;
    }
    const text = JSON.stringify(this.widget);
    const ok = this.remove();
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
  remove(): boolean {
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
