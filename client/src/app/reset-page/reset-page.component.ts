import { Component, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { MetadataService } from 'src/metadata.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-reset-page',
  templateUrl: './reset-page.component.html',
  styleUrls: ['./reset-page.component.scss', "../login/login.component.scss"]
})
export class ResetPageComponent implements OnInit {
  userData: any;
  userId: any
  loader: boolean = false;
  newPswd = new FormControl('', [Validators.required, Validators.min(5)]);
  conformPswd = new FormControl('', [Validators.required, Validators.min(5)])

  constructor(private fd: FormBuilder, private toastr: ToastrService, private modalService: BsModalService, private httpService: HttpService, private activatedRoute: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.activatedRoute.params.subscribe(params => { 
        this.userId = params?.id
      })
    }
  }
  sendData() {
    this.loader = true;
    let resetOjt = {
      id: this.userId,
      password: this.newPswd.value
    }
    if (this.newPswd.value == this.conformPswd.value) {
      this.httpService.addData('resetPassword', resetOjt).subscribe(res => {
        this.toastr.success(res.message)
        this.loader = false;
      }, error => {
        this.loader = false;
        this.toastr.warning("Something Is Wrong")
      })
    }
    else {
      this.loader = false;
      this.toastr.warning('Confirm Password Is Not Match With New Password')
    }
  }

}
