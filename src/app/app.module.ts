import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ReportBuilderComponent } from './report-builder/report-builder.component';
import { PropertiesBarComponent } from './properties-bar/properties-bar.component';
import { ContainerComponent } from './widgets/container/container.component';
import { ReportComponent } from './widgets/report/report.component';
import { PageBreakComponent } from './widgets/page-break/page-break.component';
import { WidgetComponent } from './widgets/widget/widget.component';
import { TextComponent } from './widgets/text/text.component';
import { ImageComponent } from './widgets/image/image.component';
import { ImageContainerComponent } from './widgets/image-container/image-container.component';
import { MapComponent } from './widgets/map/map.component';
import { TableComponent } from './widgets/table/table.component';
import { TableCellComponent } from './widgets/table-cell/table-cell.component';
import { ChartComponent } from './widgets/chart/chart.component';
import { ObjectEditorComponent } from './object-editor/object-editor.component';
import { ChartDataComponent } from './widgets/chart-data/chart-data.component';
import { UnknownComponent } from './widgets/unknown/unknown.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportBuilderComponent,
    PropertiesBarComponent,
    ContainerComponent,
    ReportComponent,
    PageBreakComponent,
    WidgetComponent,
    TextComponent,
    ChartComponent,
    ChartDataComponent,
    TableComponent,
    TableCellComponent,
    ImageComponent,
    ImageContainerComponent,
    MapComponent,
    ObjectEditorComponent,
    UnknownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
