import {
  Component,
  EventEmitter,
  Output,
  Type,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  @Output() closed = new EventEmitter<void>();

  childComponent!: Type<unknown>;
  width!: string;
  closeOnBackdrop!: boolean;

  ngAfterViewInit() {
    this.container.createComponent(this.childComponent);
  }

  onBackdrop() {
    if (this.closeOnBackdrop) {
      this.closed.emit();
    }
  }
}
