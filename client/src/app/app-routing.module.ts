import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '/',
    loadChildren: () =>
      import('./homepage/home.module').then(
        (m) => m.HomeModule
      ),
  },

  {
    path: 'search',
    loadChildren: () =>
      import('./search-page/search.module').then(
        (m) => m.searchModule
      ),
  },
  {
    path: 'single-news/:id',
    loadChildren: () =>
      import('./single-news/singleNews.module').then(
        (m) => m.singleNewsModule
      ),
  },
  {
    path: 'single-news/:engTitle/:id',
    loadChildren: () =>
      import('./single-news/singleNews.module').then(
        (m) => m.singleNewsModule
      ),
  },
  {
    path: 'single-news/:categoryName/:subCategoryName/:subsubCategoryName/:engTitle/:id',
    loadChildren: () =>
      import('./single-news/singleNews.module').then(
        (m) => m.singleNewsModule
      ),
  },
  {
    path: 'category-news/:categoryName',
    loadChildren: () =>
      import('./category-news/category.module').then(
        (m) => m.categoryModule
      ),
  },
  {
    path: 'category-news/:categoryName/:subCategoryName',
    loadChildren: () =>
      import('./category-news/category.module').then(
        (m) => m.categoryModule
      ),
  },
  {
    path: 'category-news/:categoryName/:subCategoryName/:subsubCategoryName',
    loadChildren: () =>
      import('./category-news/category.module').then(
        (m) => m.categoryModule
      ),
  },

  {
    path: 'videos',
    loadChildren: () =>
      import('./videos/videos.module').then(
        (m) => m.videosModule
      ),
  },
  {
    path: 'aboutus',
    loadChildren: () =>
      import('./aboutus/about.module').then(
        (m) => m.aboutModule
      ),
  },
  {
    path: 'contactus',
    loadChildren: () =>
      import('./contactus/contact.module').then(
        (m) => m.contactModule
      ),
  },
  {
    path: 'privacy',
    loadChildren: () =>
      import('./privacypolicy/privacy.module').then(
        (m) => m.privacyModule
      ),
  },
  {
    path: 'termandcondition',
    loadChildren: () =>
      import('./termcondition/termcondition.module').then(
        (m) => m.termConditionModule
      ),
  },
  {
    path: 'admin-panel',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },

  {
    path: 'forgetpassword',
    loadChildren: () =>
      import('./forgetpassword/forgetpassword.module').then(
        (m) => m.forgetPasswordModule
      ),
  },
  {
    path: 'admin-login',
    loadChildren: () =>
      import('./login/login.module').then(
        (m) => m.loginModule
      ),
  },
  {
    path: ':id/reset',
    loadChildren: () =>
      import('./reset-page/reset.module').then(
        (m) => m.resetPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
