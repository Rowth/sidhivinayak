import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss', '../user/user.component.scss']
})
export class CategoryPageComponent implements OnInit {

  modalRef: any;
  loader: boolean = true;
  config: {
    keyboard: true,
    dropdown: true,
    ignoreBackdropClick: true,
    id: 1
  }
  categoryForm: any;
  categoryArray = [];
  editCat: any;
  counterData: any;
  startPage = 0;
  limitValue = 10;
  errorMsg = null;
  constructor(private fd: FormBuilder, private toastr: ToastrService, private modalService: BsModalService, private httpService: HttpService) {
    this.categoryForm = this.fd.group({
      category: ['', Validators.required],
      order: []
    })
  }

  ngOnInit(): void {
    this.getCategory()
  }

  openModal(template: TemplateRef<any>, i: any) {
    this.editCat = this.categoryArray[i];
    this.categoryForm.patchValue({
      category: this.editCat?.categoryName || '',
      order: this.editCat?.viewOrder || ''
    })
    this.modalRef = this.modalService.show(template, this.config);
  }
  getCategory() {
    this.loader = true;
    this.httpService.getData('getAllCategory').subscribe(res => {
      this.categoryArray = res?.findAllCategory;
      this.counterData = res?.CategoryCount
      this.loader = false;
    }, error => {
      console.log(error)
    })
  }
  sendCategory() {
    this.loader = true
    this.categoryArray = [];
    let categoryData = {
      category: this.categoryForm.get('category')?.value,
      id: this.editCat?._id,
      newOrder: this.categoryForm.get('order')?.value,
      oldOrder: this.editCat?.viewOrder || ''
    }
    this.httpService.addData('addCategory', categoryData).subscribe(res => {
      this.applyFeature(res)
    }, error => {
      this.applyFeature(error)
    })
    this.modalRef.hide();
    this.categoryForm.reset();
  }

  deleteCat() {
    this.loader = true;
    this.categoryArray = [];
    this.httpService.deleteData('deleteCategory', this.editCat?._id).subscribe(res => {
      this.applyFeature(res)
    }, error => {
      this.applyFeature(error)
    })
    this.modalRef.hide();
  }
  loadPage(value: any) {
  }
  applyFeature(value: any) {
    this.getCategory();
    this.loader = false;
    !value.error ? this.toastr.success(value.message) : this.toastr.warning(`${value.error.message} ! please try again`)
  }

}
