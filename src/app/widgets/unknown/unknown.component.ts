import { Component, ViewEncapsulation, Optional } from '@angular/core';

import { WidgetComponent } from '../widget/widget.component';
import { ReportBuilderComponent } from 'src/app/report-builder/report-builder.component';

@Component({
  selector: 'app-unknown',
  templateUrl: './unknown.component.html',
  styleUrls: ['./unknown.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UnknownComponent extends WidgetComponent {

  constructor(@Optional() builder: ReportBuilderComponent) {
    super(builder);
  }

}
