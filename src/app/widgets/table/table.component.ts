import { AjfTableWidget } from '@ajf/core/reports';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation, Optional } from '@angular/core';

import { ReportBuilderComponent } from '../../report-builder/report-builder.component';
import { emptyTableCell } from '../report.interface';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent extends WidgetComponent {
  get table(): AjfTableWidget {
    return this.widget as AjfTableWidget;
  }

  constructor(@Optional() builder: ReportBuilderComponent, cdr: ChangeDetectorRef) {
    super(builder, cdr);
  }

  numColumns(): number {
    let n = 0;
    for (const cell of this.table.dataset[0]) {
      n += cell.colspan || 1;
    }
    return n;
  }

  numRows(): number {
    let n = 0;
    for (const row of this.table.dataset) {
      n += row[0].rowspan || 1;
    }
    return n;
  }

  addRow() {
    const newRow = Array(this.numColumns()).map(_ => emptyTableCell());
    this.table.dataset.push(newRow);
    this.builder.onChange();
  }

  addColumn() {
    for (const row of this.table.dataset) {
      row.push(emptyTableCell());
    }
    this.builder.onChange();
  }
}
