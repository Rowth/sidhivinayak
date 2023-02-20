import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  paticularUser: any
  profileForm: FormGroup
  adminProfileData: any;
  adminFormData: FormGroup;
  changePassword: FormGroup;
  fileImage: any;
  imagePath: any;
  imgURL: any;
  errorData: any;
  key: string = 'Name';
  myItem: string;
  userarray: any;
  personId: any
  constructor(private fd: FormBuilder, private toastr: ToastrService, private modalService: BsModalService, private httpService: HttpService) {
    this.profileForm = this.fd.group({
      username: [],
      email: [],
      oldPswd: [],
      newPswd: [],
    })
  }
  ngOnInit(): void {
    this.personId = sessionStorage.getItem('userId');
   
    this.getUserData()
  }
  getUserData() {
    this.httpService.ArrayData.subscribe(value=>{
      this.paticularUser=value
      this.profileForm.patchValue({
            username: this.paticularUser?.name,
            email: this.paticularUser?.email,
            oldPswd: this.paticularUser?.plainPass
          })
       
    })
  }
  onsubmit() {
    let userData = {
      id: this.paticularUser?._id,
      name: this.profileForm.get('username').value,
      email: this.profileForm.get('email').value,
      password: this.profileForm.get('newPswd').value || this.paticularUser?.plainPass,
    }
    this.httpService.updateData('userUpdate', userData).subscribe(res => {
       this.toastr.success('Profile Details Changed')
      this.getUserData()
    }, error => {
      console.log(error);
    })
    this.profileForm.reset();
  }





}

