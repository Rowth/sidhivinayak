import { Component, OnInit, Optional } from "@angular/core";
import { HttpService } from "src/app/http.service";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-dasbord-page",
  templateUrl: "./dasbord-page.component.html",
  styleUrls: ["./dasbord-page.component.scss"],
})
export class DasbordPageComponent implements OnInit {
  dashborddata: any;
  loader: boolean = true
  constructor(
    @Optional() private sanitizer: DomSanitizer,
    private activatFormBuilderedroute: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.httpService.getData("counterApi").subscribe(
      (res) => {
        this.dashborddata = res;
        this.loader = false
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
