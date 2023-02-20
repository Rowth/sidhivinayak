import { Component, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { MetadataService } from '../../metadata.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  emailPaswd: boolean = false;
  emailnotcrrt: boolean = false;
  passnotcrrt: boolean = false;
  loader: boolean = false;
  invalid: boolean = false
  adminData: any;
  typeChange = 'password'
  myItem: string;

  constructor(@Optional() private metadataService: MetadataService, private fd: FormBuilder, private httpService: HttpService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.loginForm = this.fd.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.metadataService) {
        this.metadataService.updateMetadata({
          title: 'Page 2',
          description: 'There is some content on page 2'
        });
      }
    }
  }

  login() {
    this.loader = true;
    let formData = {
      email: this.loginForm.get("user")?.value,
      password: this.loginForm.get("password")?.value,
    }
    this.httpService.logIn('LogIn', formData).subscribe(res => {
      let userData = {
        userId: res.userId,
        userToken: res.userToken
      }
      sessionStorage.setItem('userInfo', JSON.stringify(userData))
      this.loader = false;
      if (res.userRole[0] == 'admin') {
        this.httpService.getToken();
        let a = localStorage.setItem('login', res.userRole[0])
        this.router.navigate(['/admin-panel/dasbord-page'])
      }
    }, error => {
      this.loader = false;
      switch (error.error?.message) {
        case 'email and password incorrect':
          this.emailPaswd = true;
          break;
        case 'email incorrect':
          this.emailnotcrrt = true;
          break;
        case 'password incorrect':
          this.passnotcrrt = true;
          break;
        case 'invalid data':
          this.invalid = true;
      }
    })
    // localStorage.setItem("user_id", this.adminData?._id);
  }
  get email() {
    return this.loginForm.get("email");
  }

  changetype(value: any) {
    switch (value) {
      case 'text':
        this.typeChange = value;
        break;
      case 'password':
        this.typeChange = value;
        break;

    }
  }

}

