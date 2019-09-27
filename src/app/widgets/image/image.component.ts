import { AjfImageType } from '@ajf/core/image';
import { AjfImageWidget } from '@ajf/core/reports';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation, Optional } from '@angular/core';

import { ReportBuilderComponent } from '../../report-builder/report-builder.component';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent extends WidgetComponent {

  get image(): AjfImageWidget {
    return this.widget as AjfImageWidget;
  }

  constructor(@Optional() builder: ReportBuilderComponent, cdr: ChangeDetectorRef) {
    super(builder, cdr);
  }

  formulaInputLabel(): string {
    switch (this.image.imageType) {
      case AjfImageType.Image:
        return 'url formula: ';
      case AjfImageType.Flag:
        return 'flag formula: ';
      case AjfImageType.Icon:
        return 'icon formula: ';
      default:
        throw new Error('unknown image type');
    }
  }

  getFormula(): string {
    switch (this.image.imageType) {
    case AjfImageType.Image:
      return this.image.url.formula;
    case AjfImageType.Flag:
      return this.image.flag.formula;
    case AjfImageType.Icon:
      return this.image.icon.formula;
    default:
      throw new Error('unknown image type');
    }
  }

  setFormula(formula: string) {
    delete this.image.url;
    delete this.image.flag;
    delete this.image.icon;
    switch (this.image.imageType) {
      case AjfImageType.Image:
        this.image.url = {formula};
        break;
      case AjfImageType.Flag:
        this.image.flag = {formula};
        break;
      case AjfImageType.Icon:
        this.image.icon = {formula};
        break;
      default:
        throw new Error('unknown image type');
    }
  }

  onImageTypeChange(event: Event) {
    const formula = this.getFormula();

    const select = event.target as HTMLSelectElement;
    this.image.imageType = Number(select.value);

    this.setFormula(formula);
  }

  onFormulaChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.setFormula(input.value);
  }
}
