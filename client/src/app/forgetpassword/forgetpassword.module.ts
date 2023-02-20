import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetpasswordComponent } from './forgetpassword.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const FORGET_ROUTE: Routes = [{
    path: '', component: ForgetpasswordComponent
}]

@NgModule({
    declarations: [
        ForgetpasswordComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(FORGET_ROUTE),
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class forgetPasswordModule { }
