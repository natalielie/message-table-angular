import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pathes } from 'src/app/shared/globals';

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
    this.router.navigate([Pathes.homePath]);
  }

  goToMessagesPage(): void {
    this.router.navigate([Pathes.messagesPath]);
  }
}
