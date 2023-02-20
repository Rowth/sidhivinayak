import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutusComponent } from './aboutus.component';
import { RouterModule, Routes } from '@angular/router';
const ABOUTUS_ROUTE: Routes = [{
    path: '', component: AboutusComponent
}]

@NgModule({
    declarations: [
        AboutusComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(ABOUTUS_ROUTE)
    ]
})
export class aboutModule { 
   
}
