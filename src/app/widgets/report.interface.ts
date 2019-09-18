import { AjfAggregationType, AjfChartDataset, AjfReport, AjfWidget, AjfWidgetWithContent, AjfWidgetType } from '@ajf/core/reports';

export function emptyChartData(): AjfChartDataset {
  return {
    label: '',
    formula: [{formula: ''}],
    aggregation: {aggregation: AjfAggregationType.None}
  };
}

export function emptyTableCell(): any {
  return {
    label: '',
    formula: {formula: ''},
    aggregation: {aggregation: AjfAggregationType.None}
  };
}

function listWidgets(report: AjfReport): AjfWidget[] {
  return listWidgetsRec(report.header as any).concat(
    listWidgetsRec(report.content as any),
    listWidgetsRec(report.footer as any)
  );
}

function listWidgetsRec(w: AjfWidget): AjfWidget[] {
  const content = (w as AjfWidgetWithContent).content;
  if (content === undefined) {
    return [w];
  }
  return [w].concat(...content.map(listWidgetsRec));
}

// Fixes common mistakes found in report jsons.
export function fix(report: AjfReport) {
  const widgets = listWidgets(report);
  for (const widget of widgets) {
    const w = widget as any;
    switch (w.widgetType) {
    case (AjfWidgetType.Chart):
      if (w.type !== undefined && w.chartType === undefined) {
        w.chartType = w.type;
        delete w.type;
      }
      break;
    }
  }
}
