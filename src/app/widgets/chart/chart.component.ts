import { AjfFormula } from '@ajf/core/models';
import { AjfChartWidget } from '@ajf/core/reports';
import { Component, ViewEncapsulation, Optional } from '@angular/core';

import { ReportBuilderComponent } from '../../report-builder/report-builder.component';
import { emptyChartData } from '../report.interface';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChartComponent extends WidgetComponent {

  readonly chartTypes = ['Line', 'Bar', 'Horizontal Bar', 'Radar', 'Scatter', 'Doughnut', 'Pie', 'Polar Area', 'Bubble'];

  get chart(): AjfChartWidget {
    return this.widget as AjfChartWidget;
  }

  constructor(@Optional() builder: ReportBuilderComponent) {
    super(builder);
  }

  onChartTypeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.chart.chartType = Number(select.value);
  }

  onLabelsChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.chart.labels = {formula: input.value};
  }

  addData() {
    this.chart.dataset.push(emptyChartData());
    this.builder.onChange();
  }

  // TODO: labels formula could be an array
  getLabelsFormula(): string {
    return (this.chart.labels as AjfFormula).formula || '';
  }

}
