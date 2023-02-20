import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss', '../user/user.component.scss']
})
export class NewsListComponent implements OnInit {
  newsArray = [];
  loader: boolean = true;
  pageValid: boolean = false;
  totalNews: any;
  startPage = 0;
  limitValue = 10;
  DataNot: boolean = false;
  constructor(private fd: FormBuilder, private toastr: ToastrService, private modalService: BsModalService, private httpService: HttpService) { }

  ngOnInit(): void {
    this.getNews(this.startPage)
  }
  getNews(pageValue) {
    this.newsArray = []
    this.pageValid = false;
    this.loader = true;
    this.DataNot = false;
    this.httpService.getLimitData('getNews', this.limitValue, pageValue).subscribe(res => {
      this.newsArray = res.news1;
      this.totalNews = res.totalNews;
      this.loader = false;
      this.pageValid = true;
    }, error => {
      console.log(error);
    })
  }
  loadPage(pageNo: any) {
    this.loader = true;
    this.newsArray = []
    this.startPage = pageNo;
     this.getNews(this.startPage - 1);
  }
  sendSearch(searchValue: any) {
    this.pageValid = false;
    this.loader = true;
    this.newsArray = []
    let searchData = { search: searchValue.indexOf('\t') != -1 ? searchValue.slice(0, searchValue.indexOf('\t')) : searchValue }
    this.httpService.addData('search', searchData).subscribe(res => {
      res.findData?.length != 0 ? this.newsArray = res.findData : this.DataNot = true;
      this.totalNews = res.adsCouts;
      this.loader = false;
    }, error => {
      console.log(error);
    })

  }
}
