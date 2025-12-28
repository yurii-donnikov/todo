import { Type } from '@angular/core';

export interface ModalConfig<T = unknown> {
  component: Type<unknown>;
  data?: T;
  width?: string;
  closeOnBackdrop?: boolean;
}
