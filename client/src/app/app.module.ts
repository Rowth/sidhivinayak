import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderpageComponent } from './layout/headerpage/headerpage.component';
import { FooterpageComponent } from './layout/footerpage/footerpage.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeModule } from './homepage/home.module';
import { SharedModule } from './share/share.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderpageComponent,
    FooterpageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  // providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
