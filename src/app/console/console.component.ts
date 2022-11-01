import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';

declare var bootstrap: any

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  constructor(private router: Router, public authenticationService: AuthenticationService) {
    
  }

  ngOnInit(): void {
    // Bootstrap tooltip initialization
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }

  isLoggedIn(): boolean {
    const currentUser = this.authenticationService.currentUserValue;

    if (currentUser && currentUser.Authorization) {
      // logged in so return true
      return true;
    }

    return false;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
