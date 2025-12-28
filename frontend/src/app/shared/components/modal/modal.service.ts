import {
  Injectable,
  ApplicationRef,
  EnvironmentInjector,
  createComponent,
  Injector,
  inject,
  ComponentRef,
} from '@angular/core';
import { ModalConfig } from './modal.types';
import { MODAL_DATA } from './modal.tokens';
import { ModalComponent } from './modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalRef: ComponentRef<ModalComponent> | null = null;
  private appRef = inject(ApplicationRef);
  private envInjector = inject(EnvironmentInjector);

  open<T>(config: ModalConfig<T>) {
    this.close();

    const injector = Injector.create({
      providers: [{ provide: MODAL_DATA, useValue: config.data }],
      parent: this.envInjector,
    });

    const modal = createComponent(ModalComponent, {
      environmentInjector: this.envInjector,
      elementInjector: injector,
    });

    modal.instance.childComponent = config.component;
    modal.instance.width = config.width ?? '500px';
    modal.instance.closeOnBackdrop = config.closeOnBackdrop ?? true;

    modal.instance.closed.subscribe(() => this.close());

    this.appRef.attachView(modal.hostView);
    document.body.appendChild(modal.location.nativeElement);

    this.modalRef = modal;
  }

  close() {
    if (!this.modalRef) return;

    this.appRef.detachView(this.modalRef.hostView);
    this.modalRef.destroy();
    this.modalRef = null;
  }
}
