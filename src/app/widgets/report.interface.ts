export interface Report {
  styles?: Object;
  header: WidgetContainer;
  content: WidgetContainer;
  footer: WidgetContainer;
};

export interface Widget {
  widgetType?: WT; // absent for header, content, footer
  visibility?: Visibility;
  styles?: Object;
}

// Implemented by header, content, footer, layout, column:
export interface WidgetContainer extends Widget {
  content: Widget[];
}

export interface Visibility {
    condition: string;
};

export enum WT {
  Layout = 0,
  PageBreak,
  Image,
  Text,
  Chart,
  Table,
  Map,
  Column,
  Formula,
  ImageContainer
};

export interface Layout extends WidgetContainer {
  columns: number[];
};

export interface Image extends Widget {
  imageType: IT;
  url?: Formula;
  flag?: Formula;
  icon?: Formula;
};

export interface Formula {
  formula: string;
};

export enum IT {
  Image = 0,
  Flag,
  Icon
};

export interface Text extends Widget {
  htmlText: string;
};

export interface Chart extends Widget {
  chartType: ChartType;
  labels: Formula;
  dataset: ChartData[];
  options?: any; // type defined by chart.js
};

export enum ChartType {
  Line = 0,
  Bar,
  HorizontalBar,
  Radar,
  Scatter,
  Doughnut,
  Pie,
  PolarArea,
  Bubble
};

export interface ChartData {
  formula: Formula[];
  aggregation: Aggregation;
  label: string;
  options?: any; // AjfChartDatasetOptions
  datalabels?: any; // type defined by chart.js
};

export function emptyChartData(): ChartData {
  return {
    formula: [{formula: ''}],
    aggregation: {aggregation: 0},
    label: ''
  };
}

export interface Table extends Widget {
  cellStyles?: any;
  dataset: TableCell[][];
};

export interface TableCell {
  label: string;
  formula: Formula;
  aggregation: Aggregation;
  colspan?: number;
  rowspan?: number;
  style?: any;
};

export function emptyTableCell(): TableCell {
  return {
    label: '',
    formula: {formula: ''},
    aggregation: {aggregation: AggregationType.None}
  };
};

export interface Aggregation {
  aggregation: AggregationType;
};

export enum AggregationType {
  None = 0,
  Sum,
  Average,
  WeightedAverage
};

export interface Map extends Widget {
  coordinate: Formula;
  tileLayer: string;
  attribution: string;
  disabled: boolean;
};

export interface ImageContainer extends Widget {
  imageType: IT;
  urls?: Formula;
  flags?: Formula;
  icons?: Formula;
};
