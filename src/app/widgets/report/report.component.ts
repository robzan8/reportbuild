import { AjfReport } from '@ajf/core/reports';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component,
  Optional, ViewEncapsulation, ElementRef } from '@angular/core';

import { ReportBuilderComponent } from '../../report-builder/report-builder.component';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent extends WidgetComponent {

  get report(): AjfReport {
    return this.widget as AjfReport;
  }

  constructor(
    @Optional() builder: ReportBuilderComponent,
    cdr: ChangeDetectorRef,
    private element: ElementRef
  ) {
    super(builder, cdr);
  }

  onEditorWidthChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.element.nativeElement.style.width = val;
  }
}
