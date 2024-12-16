import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { isFunction } from 'lodash';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgTemplateOutlet, NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() public titulo?: string;
  @Input() public onClose?: () => void;

  @ViewChild('modalBackground', { static: false }) modalBackground!: ElementRef;

  public show = false;

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        this.modalBackground &&
        e.target === this.modalBackground.nativeElement
      ) {
        this.close();
      }
    });
  }

  public close() {
    this.show = false;
    if (isFunction(this.onClose)) {
      this.onClose();
    }
  }
  public open() {
    this.show = true;
  }
}
