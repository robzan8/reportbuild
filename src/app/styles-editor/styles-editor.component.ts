import { AjfWidget } from '@ajf/core/reports';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-styles-editor',
  templateUrl: './styles-editor.component.html',
  styleUrls: ['./styles-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylesEditorComponent {

  @ViewChild('stylesForm', {static: true}) stylesForm: ElementRef;

  @Input() widget: AjfWidget;
  @Input() stylesName: string;

  get styles() {
    return this.widget[this.stylesName];
  }
  set styles(s: any) {
    this.widget[this.stylesName] = s;
    this.cdr.markForCheck();
  }

  constructor(private cdr: ChangeDetectorRef) { }

  styleKeys(): string[] {
    return Object.keys(this.styles || {});
  }

  styleVal(key: string): string {
    return (this.styles || {})[key] || '';
  }

  onNewStyle(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value === '') {
      return;
    }
    this.addNewStyle(input.value);
    input.value = '';
    setTimeout(() => {
      // Give focus to the value input of the added property:
      const children = this.stylesForm.nativeElement.childNodes;
      if (children.length - 3 < 0) {
        return;
      }
      (children[children.length - 3] as HTMLInputElement).focus();
    }, 100);
  }

  addNewStyle(key: string) {
    if (!this.styles) {
      this.styles = {};
    }
    this.styles[key] = '';
  }

  onStyleKeyChange(oldKey: string, event: Event) {
    const newKey = (event.target as HTMLInputElement).value;
    const styles = this.styles;
    const val = styles[oldKey];
    delete styles[oldKey];
    if (newKey === '') {
      if (this.styleKeys().length === 0) {
        delete this.widget[this.stylesName];
      }
    } else {
      styles[newKey] = val;
    }
  }

  onStyleValChange(key: string, event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.styles[key] = val;
  }

}
