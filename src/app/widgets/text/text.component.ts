import { AjfTextWidget } from '@ajf/core/reports';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component,
  ViewEncapsulation, Optional, OnDestroy } from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ReportBuilderComponent } from '../../report-builder/report-builder.component';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent extends WidgetComponent implements OnDestroy {

  keyUp = new Subject<Event>();
  private sub: Subscription;

  get text(): AjfTextWidget {
    return this.widget as AjfTextWidget;
  }

  constructor(@Optional() builder: ReportBuilderComponent, cdr: ChangeDetectorRef) {
    super(builder, cdr);
    this.sub = this.keyUp.pipe(debounceTime(150)).subscribe(event => {
      this.onTextChange(event);
      this.cdr.markForCheck();
    });
  }

  onTextChange(event: Event) {
    (this.widget as AjfTextWidget).htmlText = (event.target as HTMLTextAreaElement).value;
  }

  onKeyup(e: Event) {
    e.stopPropagation();
    this.keyUp.next(e);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
