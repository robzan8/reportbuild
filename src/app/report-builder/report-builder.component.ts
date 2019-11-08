import { Component, ViewEncapsulation, HostListener } from '@angular/core';

import { fix, deepCopy, emptyReport, equal } from '../widgets/report.interface';
import { AjfWidget } from '@ajf/core/reports';

const historyCapacity = 11; // allows doing undo 10 times

@Component({
  selector: 'app-report-builder',
  templateUrl: './report-builder.component.html',
  styleUrls: ['./report-builder.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReportBuilderComponent {
  selectedWidget: AjfWidget;
  selectedWidgetName: string;

  public showOutput = false;

  report = emptyReport();
  private history = [emptyReport()];
  private historyIndex = 0;

  constructor() {
    this.resetSelection();
  }

  resetSelection() {
    this.selectedWidget = null;
    this.selectedWidgetName = 'widget';
  }

  @HostListener('body:keyup.esc', [])
  onEsc() {
    this.showOutput = false;
  }
  @HostListener('change', [])
  onChange() {
    if (equal(this.report, this.history[this.historyIndex])) { // no real change
      return;
    }
    this.history = this.history.slice(0, this.historyIndex + 1);
    if (this.history.length === historyCapacity) {
      this.history = this.history.slice(1);
      this.historyIndex--;
    }
    this.history.push(deepCopy(this.report));
    this.historyIndex++;
  }
  @HostListener('body:keyup.control.z', ['$event'])
  onUndo(event: Event) {
    const tag = (event.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      return;
    }
    if (this.historyIndex === 0) {
      return;
    }
    this.historyIndex--;
    this.report = deepCopy(this.history[this.historyIndex]);
    this.resetSelection();
  }
  @HostListener('body:keyup.control.y', ['$event'])
  onRedo(event: Event) {
    const tag = (event.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      return;
    }
    if (this.historyIndex === this.history.length - 1) {
      return;
    }
    this.historyIndex++;
    this.report = deepCopy(this.history[this.historyIndex]);
    this.resetSelection();
  }

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
      fix(report);
      this.report = report;
      this.resetSelection();
    };
    reader.readAsText(file);
  }

}
