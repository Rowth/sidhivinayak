import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { threadId } from 'worker_threads';


@Component({
  selector: 'app-footerpage',
  templateUrl: './footerpage.component.html',
  styleUrls: ['./footerpage.component.scss', '../headerpage/headerpage.component.scss']
})
export class FooterpageComponent implements OnInit {
  categoryForm: any;
  categoryArray = [];
  editCat: any;
  counterData: any;
  subCatArray = [];
  SubCatArray = [];
  entertainmentsubcat = [];
  NationalCat = [];
  footerSettin: any
  copyRgData: any;
  constructor(private httpService: HttpService, @Inject(PLATFORM_ID) private platformId: Object) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.httpService.getSubCategory('getSubCategory', '62d54ba40c584b33d6b50e71').subscribe(res => {
        this.entertainmentsubcat = res.findSubCategory;
      }, error => {
      })
      this.httpService.ArrayData.subscribe(value => {
        this.NationalCat = value
      })
      this.getCategory();
    }
    this.copyRgData=new Date().getFullYear()
  }
  getCategory() {
    this.httpService.dataStore.subscribe(value => {
      this.categoryArray = value;
    })
  }

  sendId(cateId: any) {
    let routeData = {
      id: cateId,
    }
    this.httpService.catIdAndData.next(routeData);
  }
  toppositon() { this.httpService.goToTop() }
}
