import { Component, OnInit,Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dash-router',
  templateUrl: './dash-router.component.html',
  styleUrls: ['./dash-router.component.scss']
})
export class DashRouterComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  currentNavValue = true;
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object  , private httpService: HttpService) { }
  showME: boolean = true
  ngOnInit(): void 
  {
    this.subscription.add(
      this.httpService.toggle$.subscribe((val) => {
        this.currentNavValue = !this.currentNavValue;
      })
    );
  	let a;
   	  if (isPlatformBrowser(this.platformId)) {
	     a = localStorage.getItem('login');
	 }
	
    
    this.httpService.dataStore.subscribe(res => {
    })
    if (a) {
      if (this.router.url == '/admin-panel') {
        this.router.navigate(['/admin-panel'])
      } else {
        this.router.navigate([this.router.url])
      }
    }
    else {
      this.router.navigate(['admin-login']);
    }
  }
}
