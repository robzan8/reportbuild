import { AjfReport } from '@ajf/core/reports';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation, HostListener } from '@angular/core';

import { WidgetComponent } from '../widgets/widget/widget.component';

@Component({
  selector: 'app-report-builder',
  templateUrl: './report-builder.component.html',
  styleUrls: ['./report-builder.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportBuilderComponent {
  private pSelectedComponent: WidgetComponent;
  get selectedComponent(): WidgetComponent { return this.pSelectedComponent; }
  set selectedComponent(selectedComponent: WidgetComponent) {
    const oldSelected = this.pSelectedComponent;
    this.pSelectedComponent = selectedComponent;
    this.cdr.markForCheck();
    if (oldSelected != null) {
      oldSelected.markForCheck();
    }
  }

  private pShowOutput = false;
  get showOutput(): boolean { return this.pShowOutput; }
  set showOutput(showOutput: boolean) {
    this.pShowOutput = showOutput;
    this.cdr.markForCheck();
  }

  report: AjfReport = {
    header: {content: [], styles: {}},
    content: {content: [], styles: {}},
    footer: {content: [], styles: {}},
  };

  @HostListener('document:keyup.delete', ['$event']) onDelete(event: KeyboardEvent) {
    return;
    // temporarily disabled. We don't want the widget to be removed each time del is
    // pressed inside an input or textarea.
    if (!this.selectedComponent) {
      return;
    }
    this.selectedComponent.remove();
  }

  constructor(private cdr: ChangeDetectorRef) { }

  onLoadJson(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => {
      const text = (ev.target as any).result;
      let report: any;
      try {
        report = JSON.parse(text);
      } catch (ex) {
        window.alert('Invalid json: ' + ex);
        return;
      }
      this.report = report;
      this.cdr.markForCheck();
    };
    reader.readAsText(file);
  }
}
