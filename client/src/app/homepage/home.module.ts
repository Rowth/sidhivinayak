import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { headerModule } from '../layout/headerpage/header.module';
import { SharedModule } from '../share/share.module';
const HOME_ROUTE: Routes = [{
    path: '', component: HomepageComponent,
    // pathMatch: 'full'
}]


@NgModule({
    declarations: [
        HomepageComponent,
    ],
    imports: [
        CommonModule,
        headerModule,
        SharedModule.forRoot(),
        RouterModule.forChild(HOME_ROUTE)
    ]
})
export class HomeModule {
}
