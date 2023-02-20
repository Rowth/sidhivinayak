import {
  Component,
  Inject,
  OnInit,
  Optional,
  Pipe,
  PLATFORM_ID,
} from "@angular/core";
import { MetadataService } from "../../metadata.service";
import { HttpService } from "src/app/http.service";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { isPlatformBrowser } from "@angular/common";
@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
})
export class HomepageComponent implements OnInit {
  loader: boolean = true;
  newsArray = [];
  arrayHome = [];
  entertaiment = [];
  sports = [];
  lifestyle = [];
  culture = [];
  astrology = [];
  food = [];
  National = [];
  International = [];
  singleVideo: any;
  startPage = 0;
  limitValue = 15;
  adsArray = [];
  imageUrl: any;
  limtTime: any;
  timer: any;
  timeData: any;
  hours: any;
  seconds: number;
  minutes: number;
  milliSeconds = 100;
  fiterOneArry1 = [];
  fiterOneArry2 = [];
  categoryArray = [];
  imagesAds = [];
  videoAds = [];
  cateWiseArray = [];
  adsArrayData = [];
  orderWise = [];
  constructor(
    @Optional() private metadataService: MetadataService,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object,
    private activatFormBuilderedroute: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getNews();
      this.getAds();
      this.videoLoad();
      this.httpService.adsScriptFun();
    }
  }
  getNews() {
    this.httpService.getLimitData("getNews", this.limitValue, this.startPage).subscribe((res) => {
      this.arrayHome = res.news1;
      this.cateWiseArray = res.newsArray;
      this.categoryArray = res.cates;
      this.loader = false;
    }, (error) => { console.log(error); }
    );
  }
  getAds() {
    this.httpService.getData("getAds").subscribe(
      (res) => {
        this.orderWise = res?.adsData;
        this.adsArrayData = res?.imgAds;
        this.imagesAds = res.findAds.filter(
          (value) => value.filetype == "image/jpeg"
        );
        this.videoAds = res.findAds.filter(
          (value) => value.filetype == "video/mp4"
        );
        this.chnageData(1, this.imagesAds);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  chnageData(sort, data) {
    this.fiterOneArry1 = data.filter((order) => order.viewOrder === sort);
    this.fiterOneArry2 = data.filter((order) => order.viewOrder === sort);
    const limitedInterval = setTimeout(() => {
      this.fiterOneArry1.push(this.fiterOneArry1?.shift());
      let limtTime = this.fiterOneArry1[0].time?.split(":");
      if (limtTime != undefined || limtTime != null) {
        let hours = limtTime[0] * 3600000;
        let minutes = limtTime[1] * 60000;
        let seconds = limtTime[2] * 1000;
        this.milliSeconds = hours + minutes + seconds;
        this.chnageAdds(sort, this.fiterOneArry1, this.milliSeconds);
        clearInterval(limitedInterval);
      }
    }, this.milliSeconds);
  }
  chnageAdds(sort, data, mili) {
    this.milliSeconds = mili;
    this.chnageData(sort, data);
  }
  goToTop() {
    this.httpService.goToTop();
  }

  isReadMore = true;

  showText() {
    this.isReadMore = !this.isReadMore;
  }

  sendcatdata(catId: any) {
    let routeData = {
      id: catId,
    };
    this.httpService.catIdAndData.next(routeData);
  }
  videoLoad() {
    this.loader = true;
    this.httpService.youtubeVide(1).subscribe(
      (res) => {
        this.singleVideo = res.items;
        this.loader = false;
        this.singleVideo.forEach((ele, i) => {
          ele["youTubeUrl"] = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${this.singleVideo[i].id.videoId}`
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
