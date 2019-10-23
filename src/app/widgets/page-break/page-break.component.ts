import { Component, Optional, ViewEncapsulation } from '@angular/core';

import { ReportBuilderComponent } from '../../report-builder/report-builder.component';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-page-break',
  templateUrl: './page-break.component.html',
  styleUrls: ['./page-break.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageBreakComponent extends WidgetComponent {

  constructor(@Optional() builder: ReportBuilderComponent) {
    super(builder);
  }

}
