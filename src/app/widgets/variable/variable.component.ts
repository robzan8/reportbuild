import { AjfReportVariable } from '@ajf/core/reports';
import { Component, ViewEncapsulation, Input } from '@angular/core';


@Component({
  selector: 'app-variable',
  templateUrl: './variable.component.html',
  styleUrls: ['./variable.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VariableComponent {

  @Input() variable: AjfReportVariable;

  onNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.variable.name = input.value;
  }

  onFormulaChange(event: Event) {
    const formula = (event.target as HTMLInputElement).value;
    this.variable.formula = {formula};
  }

}
