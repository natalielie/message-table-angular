import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

/**
 *  a component for a spinner
 */
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) {}
}
