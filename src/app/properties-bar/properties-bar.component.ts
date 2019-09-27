import { AjfTableDataset, AjfWidget } from '@ajf/core/reports';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component,
  Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-properties-bar',
  templateUrl: './properties-bar.component.html',
  styleUrls: ['./properties-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertiesBarComponent {

  @Input() widget: AjfWidget;
  @Input() widgetName = 'widget';

  private pObjectName = 'options';
  get objectName(): string {
    return this.pObjectName;
  }
  set objectName(n: string) {
    this.pObjectName = n;
    this.cdr.markForCheck();
  }

  constructor(private cdr: ChangeDetectorRef) { }

  onVisibilityConditionChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    if (val === '') {
      delete this.widget.visibility;
    } else {
      this.widget.visibility = {condition: val};
    }
    this.cdr.markForCheck();
  }

  onFormulaChange(propertyName: string, event: Event) {
    const formula = (event.target as HTMLInputElement).value;
    this.widget[propertyName] = {formula};
    this.cdr.markForCheck();
  }

  onAggregationChange(event: Event) {
    const aggregation = Number((event.target as HTMLSelectElement).value);
    (this.widget as any as AjfTableDataset).aggregation = {aggregation};
    this.cdr.markForCheck();
  }
}
