import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.scss', '../user/user.component.scss']
})
export class AdsListComponent implements OnInit {
  adsArray = [];
  adsCount: any;
  config: {
    keyboard: true,
    dropdown: true,
    ignoreBackdropClick: true,
    id: 1
  };
  modalRef: any;
  adsId: any;
  loader = false;
  constructor(private fd: FormBuilder, private toastr: ToastrService, private httpService: HttpService, private activeARouter: ActivatedRoute, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getAds();
  }
  getAds() {
    this.loader = true;
    this.adsArray = [];
    this.httpService.getData('getAds').subscribe(res => {
      this.adsArray = res.findAds;
      this.adsCount = res.countAds;
      this.loader = false;
    }, error => {
      this.applyFeature(error)
    })
  }
  openModal(template: TemplateRef<any>, Id: any) {
    this.modalRef = this.modalService.show(template, this.config);
    this.adsId = Id
  }
  deleteAdsValue() {
    this.loader = true;
    this.adsArray = [];
    this.httpService.deleteData('deleteAds', this.adsId).subscribe(res => {
      this.applyFeature(res)
    }, error => {
      this.applyFeature(error)
    })
  }
  applyFeature(value: any) {
    this.getAds();
    this.loader = false;
    !value.error ? this.toastr.success(value.message) : this.toastr.warning(`${value.error.message} ! please try again`)
  }

}
