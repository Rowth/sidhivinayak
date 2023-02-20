import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-nature-news',
  templateUrl: './nature-news.component.html',
  styleUrls: ['./nature-news.component.scss', '../user/user.component.scss']
})
export class NatureNewsComponent implements OnInit {
  modalRef: any;
  loader = false;
  config: {
    keyboard: true,
    dropdown: true,
    ignoreBackdropClick: true,
    id: 1
  }
  natureForm: FormGroup;
  NatureArray = [];
  totalNature: any;
  selectedNat: any
  constructor(private fd: FormBuilder, private toastr: ToastrService, private modalService: BsModalService, private httpService: HttpService) {
    this.natureForm = this.fd.group({
      News: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getNatureNews()
  }
  openModal(template: TemplateRef<any>, index: any) {
    this.selectedNat = this.NatureArray[index];
    if (index != 'i') {
      this.natureForm.patchValue({
        News: this.selectedNat?.NatureOfNews
      })
    }
    this.modalRef = this.modalService.show(template, this.config);
  }
  getNatureNews() {
    this.httpService.getData('getAllNatureNews').subscribe(res => {
      this.NatureArray = res.findAllNatuNews;
      this.totalNature = res.NatureCount
    }, error => {
      console.log(error);
    })
  }
  sendNews() {
    this.loader = true;
    this.NatureArray = []
    let data = {
      id: this.selectedNat?._id,
      natureNews: this.natureForm.get('News').value,
    }
    this.httpService.addData('addNatureNews', data).subscribe(res => {
      this.applyFeature(res)
    }, error => {
      this.applyFeature(error)
    })
    this.natureForm.reset();
    this.modalRef.hide()
  }
  deleteNews() {
    this.loader = true;
    this.NatureArray = [];
    this.httpService.deleteData('deleteNatureNews', this.selectedNat?._id).subscribe(res => {
      this.applyFeature(res)
    }, error => {
      this.applyFeature(error)
    })
    this.modalRef.hide()
  }
  applyFeature(value: any) {
    this.getNatureNews();
    this.loader = false;
    !value.error ? this.toastr.success(value.message) : this.toastr.warning(`${value.error.message} ! please try again`)
  }

}
