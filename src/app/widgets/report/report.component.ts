import { AjfReport } from '@ajf/core/reports';
import { Component, Optional, ViewEncapsulation, ElementRef } from '@angular/core';

import { ReportBuilderComponent } from '../../report-builder/report-builder.component';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReportComponent extends WidgetComponent {

  get report(): AjfReport {
    return this.widget as AjfReport;
  }

  constructor(@Optional() builder: ReportBuilderComponent, private element: ElementRef) {
    super(builder);
  }

  onEditorWidthChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.element.nativeElement.style.width = val;
  }

  addVariable() {
    if (this.report.variables == null) {
      this.report.variables = [];
    }
    this.report.variables.push({name: '', formula: {formula: ''}});
    this.builder.onChange();
  }
}
