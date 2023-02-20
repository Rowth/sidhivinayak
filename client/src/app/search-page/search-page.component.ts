import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss', '../category-news/category-news.component.scss']
})
export class SearchPageComponent implements OnInit {
  searchData = [];
  loader: boolean = true;
  constructor(private modalService: BsModalService, private httpService: HttpService, private activeRouter: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getSearchData();
      this.httpService.adsScriptFun();
    }
  }
  getSearchData() {
    this.loader = true;
    this.searchData = []
    this.httpService.searchValue.subscribe(res => {
      this.searchData = res;
      this.loader = false;
    })
  }
  goToTop() {
    this.httpService.goToTop();
  }

}
