import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, NgModel, Validators } from '@angular/forms';
import { HttpService } from "src/app/http.service";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  registerform: any;
  userData: any;
  modalRef: any;
  userCount: any;
  loader = false
  config: {
    keyboard: true,
    dropdown: true,
    ignoreBackdropClick: true,
    id: 1
  }
  staffData = [];
  OneUser: any;
  constructor(private httpService: HttpService, private fb: FormBuilder, private toastr: ToastrService, private modalService: BsModalService) {
    this.registerform = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      Permission: ['']
    })
  }
  register() {
    this.loader = true;
    this.staffData = [];
    this.userData = {
      id: this.OneUser?._id,
      name: this.registerform.get('name')?.value,
      email: this.registerform.get('email')?.value,
      password: this.registerform.get('password')?.value,
      permission: this.registerform.get('Permission')?.value,
    }

    if (this.OneUser?._id == null || this.OneUser?._id == undefined) {
      this.httpService.Register('Register', this.userData).subscribe(res => {
        this.applyFeature(res)
      }, error => {
        this.applyFeature(error)
      })
    }
    if (this.OneUser?._id != undefined || this.OneUser?._id != null) {
      this.httpService.updateData('userUpdate', this.userData).subscribe(res => {
        this.applyFeature(res)
      }, error => {
        this.applyFeature(error)
      })
    }
    this.modalRef.hide();
    this.registerform.reset();
    this.registerform.get('Permission').setValue('');
  }
  ngOnInit() {
    this.getData();
  }
  getData() {
    this.httpService.getData('getAdminData').subscribe(res => {
      this.staffData = res?.findAdmin;
      this.userCount = res?.userCount;
    }, error => {
      console.log(error)
    })
  }
  openModal(template: TemplateRef<any>, i: any) {
    if (i != 'i') {
      this.OneUser = this.staffData[i]
      this.registerform.patchValue({
        name: this.OneUser?.name,
        email: this.OneUser?.email,
        password: this.OneUser?.plainPass,
        Permission: this.OneUser?.permission
      })
    }
    this.modalRef = this.modalService.show(template, this.config)
  }
  deleteUsers() {
    this.loader = true;
    this.staffData = []
    this.httpService.deleteData('deleteUser', this.OneUser?._id).subscribe(res => {
      this.applyFeature(res)
    }, error => {
      this.applyFeature(error)
    })
    this.modalRef.hide()
  }
  applyFeature(value: any) {
    this.getData();
    this.loader = false;
    !value.error ? this.toastr.success(value.message) : this.toastr.warning(`${value.error.message} ! please try again`)
  }
}



