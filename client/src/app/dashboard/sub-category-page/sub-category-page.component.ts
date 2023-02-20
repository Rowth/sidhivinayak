import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-sub-category-page',
  templateUrl: './sub-category-page.component.html',
  styleUrls: ['./sub-category-page.component.scss', '../user/user.component.scss']
})
export class SubCategoryPageComponent implements OnInit {
  modalRef: any;
  config: {
    keyboard: true,
    dropdown: true,
    ignoreBackdropClick: true,
    id: 1
  }
  loader = false;
  subCategoryForm: FormGroup;
  categoryArray = [];
  subCatArray = [];
  selectValue: any;
  subCatCount: any;
  editCatData: any;
  startPage: any;
  limitValue = 10;
  constructor(private fd: FormBuilder, private toastr: ToastrService, private modalService: BsModalService, private httpService: HttpService) {
    this.subCategoryForm = this.fd.group({
      index: ['', Validators.required],
      subcategory: ['', Validators.required],
      viewOrder: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getCategory()
    this.getSubCategory();
    this.subCategoryForm.get('index').valueChanges.subscribe(value => {
      this.selectValue = this.categoryArray[value]
    })
  }
  getCategory() {
    this.httpService.getData('getAllCategory').subscribe(res => {
      this.categoryArray = res?.findAllCategory;
    }, error => {
      console.log(error)
    })
  }
  sendsubCategory() {
    this.loader = true;
    this.subCatArray = []
    let subCatData = {
      subcategory: this.subCategoryForm.get('subcategory')?.value,
      viewOrder: this.subCategoryForm.get('viewOrder')?.value,
      category: this.selectValue?.categoryName,
      CategoryId: this.selectValue?._id,
      id: this.editCatData?._id
    }
    this.httpService.addSubCategory('addSubCategory', subCatData).subscribe(res => {
      this.applyFeature(res)
    }, error => {
      this.applyFeature(error)
    })

    this.modalRef.hide();
    this.subCategoryForm.reset();
  }
  openModal(template: TemplateRef<any>, i: any) {
    this.editCatData = this.subCatArray[i]
    this.subCategoryForm.patchValue({ viewOrder: this.editCatData?.viewOrder })

    if (i != 'i') {
      this.categoryArray.forEach((element, j) => {
        if (element._id === this.subCatArray[i].categoryId) {
          this.subCategoryForm.patchValue({
            index: j,
            subcategory: this.subCatArray[i].name
          })
        }
      });
    }
    this.modalRef = this.modalService.show(template, this.config)
  }
  getSubCategory() {
    this.loader = true;
    this.subCatArray = [];
    this.httpService.getData('allGetSubCategory').subscribe(res => {
      this.subCatArray = res?.findSubCategory
      this.subCatCount = res?.subCategoryCount;
      this.loader = false;
    }, error => {
      console.log(error);
    })
  }
  deleteSubCat() {
    this.httpService.deleteData('deleteSubCategory', this.editCatData?._id).subscribe(res => {
      this.applyFeature(res)
    }, error => {
      this.applyFeature(error)
    })
    this.modalRef.hide();
  }
  loadPage(value: any) {

  }
  applyFeature(value: any) {
    this.getSubCategory();
    this.loader = false;
    !value.error ? this.toastr.success(value.message) : this.toastr.warning(`${value.error.message} ! please try again`)
  }
}
