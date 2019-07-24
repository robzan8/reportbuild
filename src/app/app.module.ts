import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReportBuilderComponent } from './report-builder/report-builder.component';
import { ReportComponent } from './widgets/report/report.component';
import { LayoutComponent } from './widgets/layout/layout.component';
import { AddWidgetButtonComponent } from './widgets/add-widget-button/add-widget-button.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportBuilderComponent,
    ReportComponent,
    LayoutComponent,
    AddWidgetButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [ReportComponent, LayoutComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
