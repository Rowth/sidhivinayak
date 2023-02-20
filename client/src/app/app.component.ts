import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sidhivinayak-Times';
  href: any
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  checkUrl() {
    return !this.router.url.includes('admin-panel') && !this.router.url.includes('admin-login') && !this.router.url.includes('forgetpassword') && !this.router.url.includes('reset')
  }

}

