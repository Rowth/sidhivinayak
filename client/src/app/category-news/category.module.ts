import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryNewsComponent } from './category-news.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../share/share.module';

const CATEGORY_ROUTE: Routes = [{
    path: '', component: CategoryNewsComponent
}]


@NgModule({
    declarations: [
        CategoryNewsComponent,

    ],
    imports: [
        CommonModule,
        SharedModule.forRoot(),
        RouterModule.forChild(CATEGORY_ROUTE),
        NgxPaginationModule,
    ]
})
export class categoryModule {
}
