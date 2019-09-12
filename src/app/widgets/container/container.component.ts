import { AjfImageType } from '@ajf/core/image';
import { AjfWidgetType, AjfLayoutWidget, AjfWidgetWithContent } from '@ajf/core/reports';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Optional, ViewEncapsulation } from '@angular/core';

import { ReportBuilderComponent } from '../../report-builder/report-builder.component';
import { emptyTableCell, emptyChartData } from '../report.interface';
import { WidgetComponent } from '../widget/widget.component';

// ContainerComponent is used to render widgets of type WidgetContainer.
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent extends WidgetComponent {

  readonly WT = AjfWidgetType;
  readonly widgetName = ['Layout', 'Page Break', 'Image', 'Text',
    'Chart', 'Table', 'Map', 'Column', 'Formula', 'Image Container'];

  @Input() widgetSet: AjfWidgetType[];

  get container(): AjfWidgetWithContent {
    return this.widget as AjfWidgetWithContent;
  }

  constructor(@Optional() builder: ReportBuilderComponent, cdr: ChangeDetectorRef) {
    super(builder, cdr);
  }

  columnIndex(): number {
    const layout = this.parent.widget as AjfLayoutWidget;
    return layout.content.indexOf(this.widget);
  }

  columnWidth(): number {
    return (this.parent.widget as AjfLayoutWidget).columns[this.columnIndex()];
  }

  onColumnWidthChange(event: Event) {
    let val = (event.target as HTMLInputElement).value;
    if (val === '') {
      val = '-1';
    }
    let width = Number(val);
    if (isNaN(width)) {
      width = -1;
    }
    (this.parent.widget as AjfLayoutWidget).columns[this.columnIndex()] = width;
    this.cdr.markForCheck();
  }

  addWidgetClicked(event: Event) {
    const select = event.target as HTMLSelectElement;
    const wt = Number(select.value);
    if (wt < 0) {
      return;
    }
    select.value = '-1';
    this.addWidget(wt);
  }

  addWidget(wt: AjfWidgetType) {
    const container = this.widget as AjfWidgetWithContent;
    if (!container.content) {
      container.content = [];
    }
    const newWidget: any = {widgetType: wt};
    switch (wt) {
    case AjfWidgetType.Layout:
      newWidget.columns = [-1, -1];
      newWidget.content = [{widgetType: AjfWidgetType.Column}, {widgetType: AjfWidgetType.Column}];
      break;
    case AjfWidgetType.Image:
      newWidget.imageType = AjfImageType.Image;
      newWidget.url = {formula: ''};
      break;
    case AjfWidgetType.Text:
      newWidget.htmlText = '';
      break;
    case AjfWidgetType.Chart:
      newWidget.chartType = 0;
      newWidget.labels = {formula: ''};
      newWidget.dataset = [emptyChartData()];
      break;
    case AjfWidgetType.Table:
      newWidget.dataset = [[emptyTableCell()]];
      break;
    case AjfWidgetType.Map:
      newWidget.coordinate = {formula: ''};
      newWidget.tileLayer = '';
      newWidget.attribution = '';
      newWidget.disabled = false;
      break;
    case AjfWidgetType.Column:
      (container as AjfLayoutWidget).columns.push(-1);
      break;
    case AjfWidgetType.ImageContainer:
      newWidget.imageType = AjfImageType.Image;
      newWidget.urls = {formula: ''};
      break;
    }
    container.content.push(newWidget);
    this.cdr.markForCheck();
  }
}
