import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactusComponent } from './contactus.component';
import { RouterModule, Routes } from '@angular/router';
const CONTACTUS_ROUTE: Routes = [{
    path: '', component: ContactusComponent
}]


@NgModule({
    declarations: [
        ContactusComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(CONTACTUS_ROUTE)
    ]
})
export class contactModule { }
