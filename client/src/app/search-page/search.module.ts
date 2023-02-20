import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../share/share.module';
const SEARCHNEWS_ROUTE: Routes = [{
    path: '', component: SearchPageComponent
}]

@NgModule({
    declarations: [
        SearchPageComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        RouterModule.forChild(SEARCHNEWS_ROUTE),
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class searchModule {

}
