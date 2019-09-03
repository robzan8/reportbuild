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

  markForCheck(): void {
    this.cdr.markForCheck();
  }

}
