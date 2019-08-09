import { Component, ViewEncapsulation } from '@angular/core';

import { Report } from '../widgets/report.interface';
import { WidgetComponent } from '../widgets/widget/widget.component';

@Component({
  selector: 'app-report-builder',
  templateUrl: './report-builder.component.html',
  styleUrls: ['./report-builder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportBuilderComponent {

  selectedComponent: WidgetComponent;
  showOutput = false;
  report: Report = {header: {content: []}, content: {content: []}, footer: {content: []}};

  constructor() { }
}
