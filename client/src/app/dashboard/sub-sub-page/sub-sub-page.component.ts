import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-sub-sub-page',
  templateUrl: './sub-sub-page.component.html',
  styleUrls: ['./sub-sub-page.component.scss', '../user/user.component.scss']
})
export class SubSubPageComponent implements OnInit {
  modalRef: any;
  config: {
    keyboard: true,
    dropdown: true,
    ignoreBackdropClick: true,
    id: 1
  }
  categoryArray = [];
  subSubCatArray = []
  subSubCategoryForm: FormGroup;
  selectCate: any;
  subCatArray: any;
  selectSubCat: any;
  subSubCount: any;
  paticularData: any
  loader: boolean = true;
  startPage: any;
  limitValue = 10;
  constructor(private fd: FormBuilder, private toastr: ToastrService, private modalService: BsModalService, private httpService: HttpService) {
    this.subSubCategoryForm = this.fd.group({
      Catindex: ['', Validators.required],
      subCatindex: ['', Validators.required],
      subname: [, Validators.required],
      viewOrder: [Validators.required],
    })
  }
  ngOnInit(): void {
    this.getCategroy();
    this.getSubSubCat();
    this.subSubCategoryForm.get('Catindex').valueChanges.subscribe(value => {
      this.selectCate = this.categoryArray[value];
      if (this.selectCate?._id) {
        this.httpService.getSubCategory('getSubCategory', this.selectCate?._id).subscribe(res => {
          this.subCatArray = res?.findSubCategory;
          if (this.paticularData?.subcategoryId) {
            this.subCatArray.forEach((element, index) => {
              if (element._id == this.paticularData.subcategoryId) {
                this.subSubCategoryForm.get('subCatindex').setValue(index);
              }
            })
          }
        }, error => {
          console.log(error);
        })
      }
    })
    this.subSubCategoryForm.get('subCatindex').valueChanges.subscribe(value => {
      this.selectSubCat = this.subCatArray[value];
    })
  }
  sendSubCat() {
    let SubSubCatData = {
      id: this.paticularData?._id,
      subSubName: this.subSubCategoryForm.get('subname')?.value,
      cateName: this.selectCate?.categoryName,
      cateId: this.selectCate?._id,
      subCateName: this.selectSubCat?.name,
      subCateId: this.selectSubCat?._id,
      viewOrder: this.subSubCategoryForm.get('viewOrder')?.value,
    }
    this.httpService.addData('addSubSubCat', SubSubCatData).subscribe(res => {
      this.applyFeature(res)
    }, error => {
      this.applyFeature(error)
    })
    this.subSubCategoryForm.reset();
    this.modalRef.hide();
  }
  openModal(template: TemplateRef<any>, i: any) {
    this.paticularData = this.subSubCatArray[i];
    if (i != 'i') {
      this.categoryArray.forEach((element, j) => {
        if (element?._id == this.subSubCatArray[i]?.categoryId) {
          this.subSubCategoryForm.patchValue({
            Catindex: j,
            subname: this.subSubCatArray[i]?.name
          })
        }
      })
      this.subSubCategoryForm.patchValue({
        viewOrder: this.paticularData?.viewOrder
      })
    }
    this.modalRef = this.modalService.show(template, this.config);
    ['Catindex', 'subCatindex'].forEach(ele => this.subSubCategoryForm.get(ele).setValue(''));
  }
  getCategroy() {
    this.httpService.getData('getAllCategory').subscribe(res => {
      this.categoryArray = res?.findAllCategory;
    }, error => {
      console.log(error)
    })
  }
  getSubSubCat() {
    this.subSubCatArray = [];
    this.loader = true
    this.httpService.getData('getSubSubCat').subscribe(res => {
      this.subSubCatArray = res?.findData;
      this.subSubCount = res?.subSubCount
      this.loader = false
    }, error => {
      console.log(error);

    })
  }
  deleteSubCat() {
    this.httpService.deleteData('deleteSubSubCat', this.paticularData?._id).subscribe(res => {
      this.applyFeature(res)
    }, error => {
      this.applyFeature(error)
    })
  }
  loadPage(vlaue: any) { }
  applyFeature(value: any) {
    this.getCategroy();
    this.getSubSubCat();
    this.loader = false;
    !value.error ? this.toastr.success(value.message) : this.toastr.warning(`${value.error.message} ! please try again`)
  }
}
