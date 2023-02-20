import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const LOGIN_ROUTE: Routes = [{
    path: '', component: LoginComponent
}]

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(LOGIN_ROUTE),
        ReactiveFormsModule,
        FormsModule,

    ]
})
export class loginModule { }
