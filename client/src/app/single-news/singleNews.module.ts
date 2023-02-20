import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleNewsComponent } from './single-news.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ShareModule } from 'ngx-sharebuttons';
import { SharedModule } from '../share/share.module';

const SINGLENEWS_ROUTE: Routes = [{
    path: '', component: SingleNewsComponent
}]


@NgModule({
    declarations: [
        SingleNewsComponent
    ],
    imports: [
        CommonModule,
        SharedModule.forRoot(),
        ShareButtonsModule,
        RouterModule.forChild(SINGLENEWS_ROUTE),
        ReactiveFormsModule,
        FormsModule,
        ShareIconsModule,
        ShareModule,

    ]
})
export class singleNewsModule {

}
