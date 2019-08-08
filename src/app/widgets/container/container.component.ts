import { Component, Input, Optional } from '@angular/core';

import { ReportBuilderComponent } from '../../report-builder/report-builder.component';
import { WT, WidgetContainer } from '../report.interface';
import { WidgetComponent } from '../widget/widget.component';

// ContainerComponent is used to render widgets of type WidgetContainer.
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent extends WidgetComponent {

  readonly WT = WT;
  readonly widgetName = ['Layout', 'Page Break', 'Image', 'Text',
    'Chart', 'Table', 'Map', 'Column', 'Formula', 'Image Container'];

  @Input() name: string;
  @Input() widgetSet: WT[];

  constructor(@Optional() builder: ReportBuilderComponent) {
    super(builder);
  }

  addWidgetClicked(event: Event) {
    const select = event.srcElement as HTMLSelectElement;
    const wt = Number(select.value);
    if (wt < 0) {
      return;
    }
    this.addWidget(wt);
    select.value = '-1';
  }

  addWidget(wt: WT) {
    const container = this.widget as WidgetContainer;
    if (!container.content) {
      container.content = [];
    }
    const newWidget: any = {widgetType: wt};
    switch (wt) {
    case WT.Layout:
      newWidget.content = [{widgetType: WT.Column}, {widgetType: WT.Column}];
    }
    container.content.push(newWidget);
  }

}