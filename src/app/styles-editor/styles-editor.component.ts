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

  private pWidget: AjfWidget;
  get widget(): AjfWidget { return this.pWidget; }
  @Input() set widget(widget: AjfWidget) {
    this.pWidget = widget;
    this.cdr.markForCheck();
  }

  private pStylesName: string;
  get stylesName(): string { return this.pStylesName; }
  @Input() set stylesName(stylesName: string) {
    this.pStylesName = stylesName;
    this.cdr.markForCheck();
  }

  get styles() { return this.widget[this.stylesName]; }
  set styles(s: any) {
    this.widget[this.stylesName] = s;
    this.cdr.markForCheck();
  }

  constructor(private cdr: ChangeDetectorRef) { }

  deleteStyles() {
    delete this.widget[this.stylesName];
    this.cdr.markForCheck();
  }

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
      this.cdr.markForCheck();
    }, 100);
  }

  addNewStyle(key: string) {
    if (!this.styles) {
      this.styles = {};
    }
    this.styles[key] = '';
    this.cdr.markForCheck();
  }

  onStyleKeyChange(oldKey: string, event: Event) {
    const newKey = (event.target as HTMLInputElement).value;
    const styles = this.styles;
    const val = styles[oldKey];
    delete styles[oldKey];
    if (newKey === '') {
      if (this.styleKeys().length === 0) {
        this.deleteStyles();
      }
    } else {
      styles[newKey] = val;
    }
    this.cdr.markForCheck();
  }

  onStyleValChange(key: string, event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.styles[key] = val;
    this.cdr.markForCheck();
  }

}
