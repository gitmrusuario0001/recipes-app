import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
  <div class="text-center">
    <div class="spinner-border text-primary" role="status"></div>  <span class="visually-hidden text-info font-weight-old ml-2">Loading...</span>
  </div>`,
 styles: []
})
export class LoadingSpinnerComponent {

}
