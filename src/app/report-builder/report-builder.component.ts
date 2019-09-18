import { AjfReport } from '@ajf/core/reports';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';

import { WidgetComponent } from '../widgets/widget/widget.component';
import { fix } from '../widgets/report.interface';

@Component({
  selector: 'app-report-builder',
  templateUrl: './report-builder.component.html',
  styleUrls: ['./report-builder.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportBuilderComponent {
  selectedComponent: WidgetComponent;

  private pShowOutput = false;
  get showOutput(): boolean { return this.pShowOutput; }
  set showOutput(showOutput: boolean) {
    this.pShowOutput = showOutput;
    this.cdr.markForCheck();
  }

  report: AjfReport = {
    header: {content: [], styles: {}},
    content: {content: [], styles: {}},
    footer: {content: [], styles: {}},
  };

  constructor(private cdr: ChangeDetectorRef) { }

  onLoadJson(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => {
      const text = (ev.target as any).result;
      let report: any;
      try {
        report = JSON.parse(text);
      } catch (ex) {
        window.alert('Invalid json: ' + ex);
        return;
      }
      fix(report);
      this.report = report;
      this.cdr.markForCheck();
    };
    reader.readAsText(file);
  }
}
