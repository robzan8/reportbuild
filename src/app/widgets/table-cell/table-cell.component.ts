import { AjfTableDataset } from '@ajf/core/reports';
import { Component, ViewEncapsulation, Optional } from '@angular/core';

import { ReportBuilderComponent } from '../../report-builder/report-builder.component';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableCellComponent extends WidgetComponent {
  get cell(): AjfTableDataset {
    return this.widget as any as AjfTableDataset;
  }

  constructor(@Optional() builder: ReportBuilderComponent) {
    super(builder);
  }

  onFormulaChange(event: Event) {
    const formula = (event.target as HTMLInputElement).value;
    this.cell.formula = {formula};
  }

}
