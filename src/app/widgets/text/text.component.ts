import { AjfTextWidget } from '@ajf/core/reports';
import { Component, ViewEncapsulation, Optional } from '@angular/core';

import { ReportBuilderComponent } from '../../report-builder/report-builder.component';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TextComponent extends WidgetComponent {

  get text(): AjfTextWidget {
    return this.widget as AjfTextWidget;
  }

  constructor(@Optional() builder: ReportBuilderComponent) {
    super(builder);
  }

  onTextChange(event: Event) {
    (this.widget as AjfTextWidget).htmlText = (event.target as HTMLTextAreaElement).value;
  }

}
