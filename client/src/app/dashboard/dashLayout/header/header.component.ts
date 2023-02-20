import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/http.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', '../../user/user.component.scss']
})
export class HeaderComponent implements OnInit {
  modalRef: any;
  config: {
    keyboard: true,
    dropdown: true,
    ignoreBackdropClick: true,
    id: 1
  }
  fileImage: any;
  imageSize: any;
  imgURL: any;
  settingForm: FormGroup;
  imagePath: any;
  settingRes: any;
  loader: boolean = false;
  constructor(private fd: FormBuilder, private toastr: ToastrService, private modalService: BsModalService, private httpService: HttpService) {
    this.settingForm = this.fd.group({
      logo: [],
      fdLink: [],
      instLink: [],
      twLink: [],
      linkInLink: [],
      offersirName: [],
      addressContact: [],
      editor: [],
      Residentials1: [],
      Residentials2: [],
      Residentials3: [],
      email: [],
      email1: [],
      phone: [],
      website: []
    })

  }

  ngOnInit(): void {
    this.getSettingData()
    
  }
  preview(files: any) {
    this.fileImage = files[0];
    this.imageSize = (this.fileImage.size / (1024 * 1024)).toFixed(3)
    if (this.imageSize > 3) {
      alert('this is more than 3mb')
      this.imgURL = null
    }
    else {
      this.settingForm.patchValue({
        logo: this.fileImage.name
      })
      var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config)
  }

  changeAction(value: any) {
    this.httpService.dataStore.next(value);
  }
  getSettingData() {
    this.httpService.getData('getSettingData').subscribe(res => {
      this.settingRes = res.findData;
      this.httpService.dataStore.next(this.settingRes)
      this.settingForm.patchValue({
        fdLink: this.settingRes?.facebook,
        instLink: this.settingRes?.instagram,
        twLink: this.settingRes?.twitter,
        linkInLink: this.settingRes?.linkedIn,
        email: this.settingRes?.email,
        phone: this.settingRes?.phone,
        Residentials3: this.settingRes?.Residentials3,
        website: this.settingRes?.Website,
        offersirName: this.settingRes?.offersirName,
        addressContact: this.settingRes?.addressContact,
        editor: this.settingRes?.editor,
        Residentials1: this.settingRes?.Residentials1,
        Residentials2: this.settingRes?.Residentials1,
        email1: this.settingRes?.email1,
      })
      this.imgURL = this.settingRes?.logo;
    }, error => {
      console.log(error);
    })
  }
  sendSetting() {
    this.loader = true
    const formData = new FormData();
    if (this.settingRes?._id) {
      formData.append('id', this.settingRes?._id);
    }
    if (this.fileImage) {
      formData.append('file', this.fileImage);
    }
    if (this.settingForm.get('fdLink').value) {
      formData.append('fdLink', this.settingForm.get('fdLink').value);
    }
    if (this.settingForm.get('instLink').value) {
      formData.append('instLink', this.settingForm.get('instLink').value);
    }
    if (this.settingForm.get('twLink').value) {
      formData.append('twLink', this.settingForm.get('twLink').value);
    }
    if (this.settingForm.get('linkInLink').value) {
      formData.append('linkInLink', this.settingForm.get('linkInLink').value);
    }
    if (this.settingForm.get('offersirName').value) {
      formData.append('offersirName', this.settingForm.get('offersirName').value);
    }
    if (this.settingForm.get('editor').value) {
      formData.append('editor', this.settingForm.get('editor').value);
    }
    if (this.settingForm.get('email').value) {
      formData.append('email', this.settingForm.get('email').value);
    }
    if (this.settingForm.get('email1').value) {
      formData.append('email1', this.settingForm.get('email1').value);
    }
    if (this.settingForm.get('phone').value) {
      formData.append('phone', this.settingForm.get('phone').value);
    }
    if (this.settingForm.get('addressContact').value) {
      formData.append('addressContact', this.settingForm.get('addressContact').value);
    }
    if (this.settingForm.get('Residentials1').value) {
      formData.append('Residentials1', this.settingForm.get('Residentials1').value);
    }
    if (this.settingForm.get('Residentials2').value) {
      formData.append('Residentials2', this.settingForm.get('Residentials2').value);
    }
    if (this.settingForm.get('Residentials3').value) {
      formData.append('Residentials3', this.settingForm.get('Residentials3').value);
    }
    if (this.settingForm.get('website').value) {
      formData.append('website', this.settingForm.get('website').value);
    }
    this.httpService.addNews('postWebData', formData).subscribe(res => {
      this.toastr.success('Changes Successfully Uploaded');
      this.getSettingData();
      this.loader = false;
      alert("Changes Successfully Uploaded");
      this.modalRef.hide()
    }, error => {
      console.log(error);
    })
  }
  clickon(e) {
    this.httpService.toggleNavbar(e.target.OnChange);
    console.log("currentNavValue header component")
  }
}
