import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"],
})
export class CommentComponent implements OnInit {
  @Input("comment") comment: any;
  title = "ratingStars";
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  hoverState = 0;
  constructor() {}

  ngOnInit(): void {
    this.rating = this.comment.rate;
  }
}
