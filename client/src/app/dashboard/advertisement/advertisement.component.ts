import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/http.service';


@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss', '../user/user.component.scss', '../creat-news/creat-news.component.scss']
})
export class AdvertisementComponent implements OnInit {
  adsForms: FormGroup;
  fileImage: any;
  imageSize: any;
  imgURL: any;
  imagePath: any;
  singleAds: any;
  btnLoader: boolean = false;
  cateArray = [];
  subCatArray = [];
  subSubArray = [];
  SubnNotFound: boolean = false;
  subSubFound: boolean = false;
  selectedCate: any;
  selectedSubCat: any;
  selectedSubSub: any;
  constructor(private fd: FormBuilder, private toastr: ToastrService, private httpService: HttpService, private activeARouter: ActivatedRoute,) {
    this.adsForms = this.fd.group({
      catIndex: [''],
      subCatIndex: [''],
      subsubCatIndex: [''],
      image: ['', Validators.required],
      time: [],
      title: [],
      url: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getCategor();
    this.adsForms.get('catIndex').valueChanges.subscribe(value => {
      this.selectedCate = this.cateArray[value];
      this.subCatArray = [];
      this.subSubArray = [];
      if (this.selectedCate?._id) {
        this.httpService.getSubCategory('getSubCategory', this.selectedCate?._id).subscribe(res => {
          this.subCatArray = res?.findSubCategory;
          this.SubnNotFound = false;
          this.subSubFound = false
          if (this.singleAds?.adsSubcateId) {
            this.subCatArray.forEach((ele, i) => {
              if (ele._id == this.singleAds?.adsSubcateId) {
                this.adsForms.patchValue({
                  subCatIndex: i
                })
              }
            })
          }

        }, error => {
          this.SubnNotFound = true;
          this.subSubFound = false
          this.toastr.warning(error.error.message)
        })
      }
      this.adsForms.get('subCatIndex').valueChanges.subscribe(res => {
        this.selectedSubCat = this.subCatArray[res];
        if (this.selectedSubCat?._id) {
          this.httpService.getSubCategory('paticularSubTwoCat', this.selectedSubCat?._id).subscribe(res => {
            this.subSubArray = res?.findData
            this.subSubFound = false
            if (this.singleAds?.adsSubSubCateId) {
              this.subSubArray.forEach((ele, i) => {
                if (ele._id == this.singleAds?.adsSubSubCateId) {
                  this.adsForms.patchValue({
                    subsubCatIndex: i
                  })
                }
              })
            }
          }, error => {
            this.subSubFound = true;
          })
        }
      })
      this.adsForms.get('subsubCatIndex').valueChanges.subscribe(value => {
        this.selectedSubSub = this.subSubArray[value];
      })
    })
    this.activeARouter.params.subscribe(params => {
      if (params?.id) {
        this.httpService.getSubCategory('getOneAds', params?.id).subscribe(res => {
          this.singleAds = res
           this.adsForms.patchValue({
            time: this.singleAds?.time,
            title: this.singleAds?.title,
            url: this.singleAds?.url
          })
          this.imgURL = this.singleAds?.image
        }, error => {
          console.log(error);
        })
      }
    })
  }
  getCategor() {
    this.httpService.getData('getAllCategory').subscribe(res => {
      this.cateArray = res.findAllCategory;
      if (this.singleAds?.adsCategoryId) {
        this.cateArray.forEach((ele, i) => {
          if (ele._id == this.singleAds?.adsCategoryId) {
            this.adsForms.patchValue({
              catIndex: i
            })
          }
        })
      }
    }, error => {
      console.log(error, "========");
    })
  }
  preview(files: any) {
    this.fileImage = files[0];
    this.imageSize = (this.fileImage.size / (1024 * 1024)).toFixed(3)
    if (this.imageSize > 3) {
      alert('this is more than 3mb')
      this.imgURL = null
    }
    else {
      this.adsForms.patchValue({
        image: this.fileImage.name
      })
      var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }
  sendAds() {
    this.btnLoader = true;
    const formData = new FormData();
    if (this.singleAds?._id) {
      formData.append('id', this.singleAds?._id);
    }
    if (this.fileImage) {
      formData.append('file', this.fileImage);
    }
    if (this.selectedCate?._id) {
      formData.append('categoryid', this.selectedCate?._id);
    }
    if (this.selectedCate?.categoryName) {
      formData.append('categoryname', this.selectedCate?.categoryName);
    }
    if (this.selectedSubCat?._id) {
      formData.append('subcateid', this.selectedSubCat?._id);
    }
    if (this.selectedSubCat?.name) {
      formData.append('subcatename', this.selectedSubCat?.name);
    }
    if (this.selectedSubSub?._id) {
      formData.append('subsubcateid', this.selectedSubSub?._id);
    }
    if (this.selectedSubSub?.name) {
      formData.append('subsubcatename', this.selectedSubSub?.name);
    }
    if (this.adsForms.get('title').value) {
      formData.append('title', this.adsForms.get('title').value);
    }
    if (this.adsForms.get('time').value) {
      formData.append('time', this.adsForms.get('time').value);
    }
    if (this.adsForms.get('url').value) {
      formData.append('url', this.adsForms.get('url').value);
    }
    // this.httpService.addNews('addAds', formData).subscribe(res => {
    //   this.toastr.success(res.message)
    //   this.btnLoader = false;
    // });
    this.adsForms.reset();
    ['catIndex', 'subCatIndex', 'subsubCatIndex'].forEach(ele => this.adsForms.get(ele).setValue(''));
    this.imgURL = null;
    this.SubnNotFound = false;
    this.subSubFound = false;

  }

}
