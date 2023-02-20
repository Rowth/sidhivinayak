import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-read-news',
  templateUrl: './read-news.component.html',
  styleUrls: ['./read-news.component.scss', '../user/user.component.scss']
})

export class ReadNewsComponent implements OnInit {
  oneNews: any;
  modalRef: any;
  params: any;
  loader: boolean = true;
  config: {
    keyboard: true,
    dropdown: true,
    ignoreBackdropClick: true,
    id: 1
  }
  constructor(private fd: FormBuilder, private toastr: ToastrService, private modalService: BsModalService, private httpService: HttpService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.params = params.id;
      this.httpService.getSubCategory('getOneNews', params.id).subscribe(res => {
        this.oneNews = res;
        this.loader = false;
      }, error => {
        console.log(error);
      })
    })
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config)
  }
  deleteNewss() {
    this.httpService.deleteData('deleteNews', this.params).subscribe(res => {
      this.toastr.success(res.message);
      this.router.navigateByUrl('admin-panel/addNewsList')
    }, error => {
      console.log(error);
      this.toastr.warning(`${error.error.message} ! please try again`)
    })
    this.modalRef.hide();
  }
}
