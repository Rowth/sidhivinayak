import { Component, OnInit, Optional } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MetadataService } from 'src/metadata.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss', '../../app/single-news/single-news.component.scss'],
})
export class VideosComponent implements OnInit {
  videoArray = [];
  page = 9;
  loader: boolean = true;
  firstPage = 0
  nextPage: any;
  prevPage: any;
  PageNotFound = false;
  constructor(@Optional() private metadataService: MetadataService, private sanitizer: DomSanitizer, private activatedroute: ActivatedRoute, private httpService: HttpService,) { }

  ngOnInit(): void {
    this.videoLoad()
  }
  videoLoad() {
    this.loader = true
    this.PageNotFound = false;
    this.httpService.youtubeVide(50).subscribe(res => {
      this.nextPage = res.nextPageToken;
      this.prevPage = res.prevPageToken
      this.videoArray = res.items;
      this.loader = false;
      this.videoArray.forEach((ele, i) => {
        ele['youTubeUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoArray[i].id.videoId}`);
      })
    }, error => {
      console.log(error);
      this.PageNotFound = true;
      this.loader = false;
    })

  }


}
