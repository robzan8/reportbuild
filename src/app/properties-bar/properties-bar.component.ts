import { AjfTableDataset } from '@ajf/core/reports';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-properties-bar',
  templateUrl: './properties-bar.component.html',
  styleUrls: ['./properties-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PropertiesBarComponent {

  @Input() widget: any;
  @Input() widgetName = 'widget';

  private pObjectName = 'options';
  get objectName(): string {
    return this.pObjectName;
  }
  set objectName(n: string) {
    this.pObjectName = n;
  }

  constructor() { }

  onVisibilityConditionChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    if (val === '') {
      delete this.widget.visibility;
    } else {
      this.widget.visibility = {condition: val};
    }
  }

  onLabelChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.widget.label = input.value;
  }

  onAggregationChange(event: Event) {
    const aggregation = Number((event.target as HTMLSelectElement).value);
    (this.widget as any as AjfTableDataset).aggregation = {aggregation};
  }
}
