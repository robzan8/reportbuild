import { AjfAggregationType, AjfChartDataset, AjfTableDataset } from '@ajf/core/reports';

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
