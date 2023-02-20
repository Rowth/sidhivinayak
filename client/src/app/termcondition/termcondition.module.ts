import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermconditionComponent } from './termcondition.component';
import { RouterModule, Routes } from '@angular/router';
const TERMCONDITION_ROUTE: Routes = [{
    path: '', component: TermconditionComponent
}]
@NgModule({
    declarations: [
        TermconditionComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(TERMCONDITION_ROUTE)
    ]
})
export class termConditionModule { }
