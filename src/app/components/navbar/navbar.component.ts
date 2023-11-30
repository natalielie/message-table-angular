import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { homePath, messagesPath } from 'src/app/shared/globals';

/**
 * a component of the navbar for all pages
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  goToHomePage(): void {
    this.router.navigate([homePath]);
  }

  goToMessagesPage(): void {
    this.router.navigate([messagesPath]);
  }

  // goCreatePage(): void {
  //   this.router.navigate([createPath]);
  // }
}
