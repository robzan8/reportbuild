import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { StylesEditorComponent } from './styles-editor/styles-editor.component';
import { ChartComponent } from './widgets/chart/chart.component';

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
    TableComponent,
    TableCellComponent,
    ImageComponent,
    ImageContainerComponent,
    MapComponent,
    StylesEditorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
