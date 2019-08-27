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
  private pName: string;
  get name(): string { return this.pName; }
  @Input() set name(name: string) {
    this.pName = name;
    this.cdr.markForCheck();
  }

  private pWidget: Widget;
  get widget(): Widget { return this.pWidget; }
  @Input() set widget(widget: Widget) {
    this.pWidget = widget;
    this.cdr.markForCheck();
  }

  private pParent: WidgetContainer;
  get parent(): WidgetContainer { return this.pParent; }
  @Input() set parent(parent: WidgetContainer) {
    this.pParent = parent;
    this.cdr.markForCheck();
  }

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

  markForCheck(): void {
    this.cdr.markForCheck();
  }

}
