import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-news",
  templateUrl: "./news.page.html",
  styleUrls: ["./news.page.scss"]
})
export class NewsPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    console.log("new page entered");
  }

  onPostNews() {
    this.router.navigateByUrl("/news/new");
  }
}
