import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  logoImg: any;
  findUserData: any;
  permissionData: any;
  constructor(private router: Router, private httpService: HttpService) { }
  ngOnInit(): void {
    this.findUserData = JSON.parse(sessionStorage.getItem('userInfo'));
    this.httpService.dataStore.subscribe(res => {
      this.logoImg = res.logo
    })
    this.getUserData();
  }
  getUserData() {
    this.httpService.getSubCategory('paticularUser', this.findUserData.userId).subscribe(res => {
      this.permissionData = res.userFind
      this.httpService.ArrayData.next(res.userFind);
    }, error => {
      console.log(error);
    })
  }

  logOut() {
    localStorage.removeItem('login');
    sessionStorage.removeItem('userInfo')
    this.router.navigate(['/']);
  }
}
