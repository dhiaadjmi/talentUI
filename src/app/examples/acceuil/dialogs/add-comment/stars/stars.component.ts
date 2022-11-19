import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-stars",
  templateUrl: "./stars.component.html",
  styleUrls: ["./stars.component.css"],
})
export class StarsComponent implements OnInit {
  starClassName = "star-rating-blank";
  @Input() starId;
  @Input() rating;
  @Input() disabled;

  @Output() leave: EventEmitter<number> = new EventEmitter();
  @Output() enter: EventEmitter<number> = new EventEmitter();
  @Output() bigClick: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit() {
    if (this.rating >= this.starId) {
      this.starClassName = "star-rating-filled";
    }
  }

  onenter() {
    if (!this.disabled) {
      this.enter.emit(this.starId);
    }
  }

  onleave() {
    if (!this.disabled) {
      this.leave.emit(this.starId);
    }
  }

  starClicked() {
    if (!this.disabled) {
      this.bigClick.emit(this.starId);
    }
  }
}
