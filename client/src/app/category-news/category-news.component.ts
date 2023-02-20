import { Component, OnInit, Inject, PLATFORM_ID, } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-category-news',
  templateUrl: './category-news.component.html',
  styleUrls: ['./category-news.component.scss']
})
export class CategoryNewsComponent implements OnInit {
  loader: boolean = true;
  allcategorydata = [];
  categoryId: any;
  commingSoon: boolean = false;
  catName: any;
  subCatName: any;
  subSubName: any;
  paramsId: any;
  startPage = 0;
  limitValue = 9;
  totalNews: any;
  queryValue: string;
  sendData: any;
  routerName: any;
  meta: any;
  getSubCat: any
  statesName: any;
  citysName: any;
  catObject: any
  catStatus: string;
  adsArrayData = []
  constructor(private fd: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object, private toastr: ToastrService, private modalService: BsModalService, private httpService: HttpService, private activeRouter: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.paramsId = null;
      this.activeRouter.params.subscribe(params => {
        this.catObject = params;
        this.getData();
        this.httpService.adsScriptFun();
      });
    }
  }
  replaceData(data: any) { return data.replace(/-/g, ' '); }
  getData() {
    if (this.catObject?.categoryName && !this.catObject?.subCategoryName) {
      this.queryValue = this.catObject?.categoryName.replace(/-/g, ' ');
      this.catStatus = 'Category'
      this.callApi(this.queryValue, 'Category')
    }
    else if (this.catObject?.categoryName && this.catObject?.subCategoryName && !this.catObject?.subsubCategoryName) {
      this.queryValue = this.catObject?.subCategoryName.replace(/-/g, ' ');
      this.catStatus = 'SubCategory'
      this.callApi(this.queryValue, 'SubCategory')
    }
    else if (this.catObject?.categoryName && this.catObject?.subCategoryName && this.catObject?.subsubCategoryName) {
      this.queryValue = this.catObject?.subsubCategoryName.replace(/-/g, ' ');
      this.catStatus = 'SubSubCategory'
      this.callApi(this.queryValue, 'SubSubCategory')
    }
  }
  callApi(catName: any, catStatus: any) {
    this.adsArrayData = [];
    this.loader = true;
    this.allcategorydata = [];
    this.startPage = 0;
    this.commingSoon = false;
    this.httpService.categoryGet('getCateNews', catName, catStatus, this.limitValue, this.startPage).subscribe(res => {
      res?.message ? this.commingSoon = true : this.allcategorydata = res.response;
      this.loader = false;
      this.totalNews = res.countNews;
    })
    this.httpService.categoryGet('getAds', catName, catStatus, this.limitValue, this.startPage).subscribe(res => {
      this.adsArrayData = res?.imgAds;
    }, error => {
      console.log(error);
    })

  }
  loadPage(value: any) {
    this.loader = true;
    this.allcategorydata = [];
    this.startPage = value;
    this.httpService.categoryGet('getCateNews', this.queryValue, this.catStatus, this.limitValue, this.startPage - 1).subscribe(res => {
      this.allcategorydata = res.response;
      this.loader = false;
      this.commingSoon = false;
      this.commingSoon = null;
    }, error => {
      this.allcategorydata = [];
      this.commingSoon = false
    })
  }

  allcategory(id: any) {
    this.httpService.getData('getCateNews').subscribe(res => {
      this.allcategorydata = res.findData;
    }, error => {
    })
  }
  sendcatdata(catId: any) {
    let routeData = {
      id: catId,
    }
    this.httpService.catIdAndData.next(routeData);
  }
  goToTop() { this.httpService.goToTop() }
}


