import { Component, OnInit, Inject, PLATFORM_ID, } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Title, Meta } from '@angular/platform-browser';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.scss']
})
export class SingleNewsComponent implements OnInit {
  newsArray = [];
  newsData: any;
  oneNews: any;
  params: any;
  loader: boolean = true;
  moreLoader: boolean = false;
  lessLoader: boolean = false
  categoryNews = [];
  categoryads: any;
  comming: boolean = false;
  urlink: any
  limit = 2;
  size = 0;
  breadCrums: any;
  sliceValue = 700;
  isReadMore = true
  dotedValue = "..."
  facebookUrl: any;
  twitterUrl: any;
  whatsappUrl: any;
  newsContent: any;
  PageNotFound = false

  constructor(private metaTagService: Meta, private httpService: HttpService, @Inject(PLATFORM_ID) private platformId: Object, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.loader = true;
    this.activatedRoute.params.subscribe(params => {
      this.breadCrums = params;
      this.sliceValue = 700;
      this.isReadMore = true;
      this.dotedValue = "...";
      this.PageNotFound = false;
      this.httpService.getSubCategory('getOneNews', params?.id).subscribe(res => {
        this.oneNews = res;
        if (this.oneNews) {
          let nwesData = (this.oneNews?.news && this.oneNews?.news.length <= 700) ? this.oneNews?.news : this.oneNews?.news?.slice(0, this.sliceValue).concat('...');
          this.newsContent = this.sanitizer.bypassSecurityTrustHtml(nwesData);
        }
        this.facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=https://sidhivinayaktimes.com${this.router.url}`;
        this.twitterUrl = `https://twitter.com/intent/tweet?url=https://sidhivinayaktimes.com${this.router.url}`;
        this.whatsappUrl = `https://api.whatsapp.com/send?text=https://sidhivinayaktimes.com${this.router.url}`;
        this.urlink = this.oneNews?._id
        this.loader = false;
        this.metaTagService.updateTag({ property: 'og:url', content: `https://sidhivinayaktimes.com${this.router.url}` });
        this.metaTagService.updateTag({ property: 'og:image', content: this.oneNews.image });
        this.metaTagService.updateTag({ property: 'og:title', content: this.oneNews?.title });
        this.metaTagService.updateTag({ property: 'og:description', content: this.oneNews?.title });
        this.metaTagService.updateTag({ name: 'twitter:image:src', content: this.oneNews.image });
        this.metaTagService.updateTag({ name: 'twitter:title', content: this.oneNews?.title });
        this.metaTagService.updateTag({ name: 'twitter:description', content: this.oneNews?.title });
        if (isPlatformBrowser(this.platformId)) {
          if (this.categoryNews?.length == 0) {
            this.loadData(this.size)
          }
        }
      }, error => {
        this.loader = false;
        this.PageNotFound = true
      })
    })
    if (isPlatformBrowser(this.platformId)) {
      this.httpService.adsScriptFun();
    }
  }
  replaceData(data: any) {
    return data.replace(/-/g, ' ');
  }
  loadData(pageValue: any) {
    this.httpService.getLimitValue('getNewsCate', this.oneNews?.categoryId, this.limit, pageValue).subscribe(res => {
      Array.prototype.push.apply(this.categoryNews, res.response)
      this.categoryads = res.adsData;
      this.lessLoader = false;
      this.moreLoader = false;
      if (this.categoryNews?.length == 0) {
        this.comming = true;
      }
    }, error => {
      this.lessLoader = false;
      this.moreLoader = false;
      console.log(error);
    })
  }
  loadMore(stringValue: any) {
    switch (stringValue) {
      case 'more':
        this.size += 1
        this.moreLoader = true
        break;
      case 'less':
        this.size -= 1;
        this.lessLoader = true
    }
    this.loadData(this.size)


  }
  goToTop() {
    this.httpService.goToTop()
  }
  showText() {
    this.isReadMore = false;
    this.sliceValue = this.oneNews.news?.length;
    this.dotedValue = "Thank You 😊"
    this.newsContent = this.sanitizer.bypassSecurityTrustHtml(this.oneNews?.news);
  }

  sendcatdata(catId: any) {
    let routeData = {
      id: catId,
    }
    this.httpService.catIdAndData.next(routeData);
  }
}
