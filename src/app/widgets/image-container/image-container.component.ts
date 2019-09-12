import { AjfImageType } from '@ajf/core/image';
import { AjfFormula } from '@ajf/core/models';
import { AjfImageContainerWidget } from '@ajf/core/reports';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Optional, ViewEncapsulation } from '@angular/core';

import { ReportBuilderComponent } from '../../report-builder/report-builder.component';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageContainerComponent extends WidgetComponent {

  readonly IT = AjfImageType;
  readonly keys = Object.keys;

  get imageContainer(): AjfImageContainerWidget {
    return this.widget as AjfImageContainerWidget;
  }

  constructor(@Optional() builder: ReportBuilderComponent, cdr: ChangeDetectorRef) {
    super(builder, cdr);
  }

  formulaInputLabel(): string {
    switch (this.imageContainer.imageType) {
      case AjfImageType.Image:
        return 'urls formula: ';
      case AjfImageType.Flag:
        return 'flags formula: ';
      case AjfImageType.Icon:
        return 'icons formula: ';
      default:
        throw new Error('unknown image type');
    }
  }

  getFormula(): string {
    // TODO: urls, flags, icons could be arrays
    switch (this.imageContainer.imageType) {
      case AjfImageType.Image:
        return (this.imageContainer.urls as AjfFormula).formula;
      case AjfImageType.Flag:
        return (this.imageContainer.flags as AjfFormula).formula;
      case AjfImageType.Icon:
        return (this.imageContainer.icons as AjfFormula).formula;
      default:
        throw new Error('unknown image type');
    }
  }

  setFormula(formula: string) {
    delete this.imageContainer.urls;
    delete this.imageContainer.flags;
    delete this.imageContainer.icons;
    switch (this.imageContainer.imageType) {
      case AjfImageType.Image:
        this.imageContainer.urls = {formula};
        break;
      case AjfImageType.Flag:
        this.imageContainer.flags = {formula};
        break;
      case AjfImageType.Icon:
        this.imageContainer.icons = {formula};
        break;
      default:
        throw new Error('unknown image type');
    }
    this.cdr.markForCheck();
  }

  onImageTypeChange(event: Event) {
    const formula = this.getFormula();

    const select = event.target as HTMLSelectElement;
    this.imageContainer.imageType = Number(select.value);

    this.setFormula(formula);
  }

  onFormulaChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.setFormula(input.value);
  }
}
