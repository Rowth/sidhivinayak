import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.scss']
})
export class PrivacypolicyComponent implements OnInit {

  constructor(private httpservice: HttpService, @Inject(PLATFORM_ID) private platformId: Object) { }
  privacyData: any
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.httpservice.contactdata.subscribe(value => {
        this.privacyData = value?.findData
      })
    }
  }

}
