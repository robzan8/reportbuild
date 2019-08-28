import { AjfTableDataset } from '@ajf/core/reports';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation, Optional } from '@angular/core';

import { ReportBuilderComponent } from '../../report-builder/report-builder.component';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCellComponent extends WidgetComponent {
  get cell(): TableCell {
    return this.widget as TableCell;
  }

  constructor(@Optional() builder: ReportBuilderComponent, cdr: ChangeDetectorRef) {
    super(builder, cdr);
  }

  onLabelChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.cell.label = input.value;
    this.cdr.markForCheck();
  }

}
