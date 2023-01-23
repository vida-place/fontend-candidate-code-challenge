import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
})
export class SidebarComponent {
  constructor(private readonly userService: UserService) {}

  login() {
    this.userService.login();
  }

  logout() {
    this.userService.logout();
  }

  get isLoggedIn() {
    return this.userService.isLoggedIn;
  }
}
