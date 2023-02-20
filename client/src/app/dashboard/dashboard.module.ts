import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboardRouting } from './dashboardrouter';
import { DashRouterComponent } from './dashLayout/dash-router/dash-router.component';
import { HeaderComponent } from './dashLayout/header/header.component';
import { SidebarComponent } from './dashLayout/sidebar/sidebar.component';
import { CreatNewsComponent } from './creat-news/creat-news.component';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryPageComponent } from './category-page/category-page.component';
import { SubCategoryPageComponent } from './sub-category-page/sub-category-page.component';
import { SubSubPageComponent } from './sub-sub-page/sub-sub-page.component';
import { NewsListComponent } from './news-list/news-list.component';
import { ReadNewsComponent } from './read-news/read-news.component';
import { SettingComponent } from './setting/setting.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { AdsListComponent } from './ads-list/ads-list.component';
import { TagInputModule } from 'ngx-chips';
import { NatureNewsComponent } from './nature-news/nature-news.component';
import { DasbordPageComponent } from './dasbord-page/dasbord-page.component';
import { AdsAddComponent } from './ads-add/ads-add.component'; 
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { ContactDetailsComponent } from './contact-details/contact-details.component';
import {NgxImageCompressService} from "ngx-image-compress";



@NgModule({
  declarations: [
    DashRouterComponent,
    HeaderComponent,
    SidebarComponent,
    CreatNewsComponent,
    UserComponent,
    CategoryPageComponent,
    SubCategoryPageComponent,
    SubSubPageComponent,
    NewsListComponent,
    ReadNewsComponent,
    SettingComponent,
    AdvertisementComponent,
    AdsListComponent,
    NatureNewsComponent,
    DasbordPageComponent,
    AdsAddComponent,
    ContactDetailsComponent
  ],
  imports: [
    CommonModule,
    dashboardRouting,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    CKEditorModule,
    TagInputModule,
    
  ],
  providers: [NgxImageCompressService],

})
export class DashboardModule {
}


