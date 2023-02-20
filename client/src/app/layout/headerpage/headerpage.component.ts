import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-headerpage',
  templateUrl: './headerpage.component.html',
  styleUrls: ['./headerpage.component.scss']
})
export class HeaderpageComponent implements OnInit {
  categoryForm: any;
  categoryArray = [];
  editCat: any;
  NationalCat = [];
  SubCatArray = [];
  userId: any
  showCat: boolean = true;
  settingWork: any;
  defaultSearch: any;
  dataStore = [];
  showToggle="notshow";
  constructor(private httpService: HttpService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.settingData();
      this.footerId()
      this.httpService.getData('getAllCategory').subscribe(res => {
        this.categoryArray = res?.findAllCategory;
        this.httpService.dataStore.next(this.categoryArray);
      }, error => {
        console.log(error)
      })
      this.httpService.getSubCategory('getSubCategory', '62d6580e37380c96b14f19c9').subscribe(res => {
        this.NationalCat = res.findSubCategory
        this.httpService.ArrayData.next(this.NationalCat);
      }, error => {
        console.log(error);
      })
    }
  }
  settingData() {
    this.httpService.getData('getSettingData').subscribe(res => {
      this.httpService.contactdata.next(res);
      this.settingWork = res?.findData;
    }, error => {
      console.log(error);
    })
  }
  search(value: any) {
    let searchData = {
      search: value
    }
    this.httpService.addData('search', searchData).subscribe(res => {
      if (res) {
        this.httpService.searchValue.next(res.findData);
        this.router.navigate(['/search']);

      }
    }, error => {
      console.log(error);
    })
  }
  footerId() {
    this.httpService.catIdAndData.subscribe(value => {
      this.getSubCat(value?.id);
    })
  }
  getSubCat(catName: any) {
    if (catName) {
      this.httpService.getSubCategorybyName('paticularSubTwoCat', catName, 'homePage').subscribe(res => {
        res.status == 401 ? this.SubCatArray = [] : this.SubCatArray = res.findData;
      }, error => {
        console.log(error,);
      })
    }
  }
  sendcatdata(catId: any, catName: any) {
    // let routeData = {
    //   id: catId,
    //   categoryName: catName
    // }
    // this.httpService.catIdAndData.next(routeData);
  }
}
