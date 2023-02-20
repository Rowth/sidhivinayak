import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPageComponent } from './reset-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const RESET_ROUTE: Routes = [{
    path: '', component: ResetPageComponent
}]


@NgModule({
    declarations: [
        ResetPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(RESET_ROUTE),
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class resetPageModule { }
