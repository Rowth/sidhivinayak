import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NgModel, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss', '../login/login.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  forgetPassword: FormGroup;
  userData: any;
  loader: boolean = false;
  emailnotcorrect: boolean = false;
  constructor(private httpService: HttpService, private fb: FormBuilder, private toastr: ToastrService) {
    this.forgetPassword = this.fb.group({
      email: ['', Validators.required],
    })
  }
  ngOnInit() {
  }
  forget() {
    this.loader = true;
    this.userData = {
      email: this.forgetPassword.get('email')?.value,
    }
     this.httpService.forgetPswd('forgetPassword', this.userData).subscribe(res => {
      if (res.status == 200) {
        this.toastr.success(res.message);
        this.loader = false;
      }
    }, error => {
      console.log(error);
      if (error.error.status == 401) {
        this.emailnotcorrect = true;
        this.loader = false;
      }
    })
  }
}