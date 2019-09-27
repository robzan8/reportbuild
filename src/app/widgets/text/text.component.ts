import { AjfTextWidget } from '@ajf/core/reports';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component,
  ViewEncapsulation, Optional } from '@angular/core';

import { ReportBuilderComponent } from '../../report-builder/report-builder.component';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent extends WidgetComponent {

  get text(): AjfTextWidget {
    return this.widget as AjfTextWidget;
  }

  constructor(@Optional() builder: ReportBuilderComponent, cdr: ChangeDetectorRef) {
    super(builder, cdr);
  }

  onTextChange(event: Event) {
    (this.widget as AjfTextWidget).htmlText = (event.target as HTMLTextAreaElement).value;
  }

}
