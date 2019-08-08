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