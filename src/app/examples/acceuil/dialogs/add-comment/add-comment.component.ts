import { Component, Inject, OnInit, Output, ViewChild, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserService } from "app/examples/services/user.service";

@Component({
  selector: "app-add-comment",
  templateUrl: "./add-comment.component.html",
  styleUrls: ["./add-comment.component.css"],
})
export class AddCommentComponent implements OnInit {
  @Output() newComment = new EventEmitter<any>();

  constructor(
    private service_user: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { post: Object },
    public MatDialogRef: MatDialogRef<AddCommentComponent>
  ) {}

  title = "ratingStars";
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  user: any;
  hoverState = 0;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("connectedUser"));
  }

  onSubmit(form): void {
    let post = JSON.parse(JSON.stringify(this.data.post));
    let formData = {
      text: form.text,
      rate: this.rating,
      post_id: post._id,
      user_id: this.user._id,
    };

    this.service_user.saveComment(formData).subscribe((res:any) => {
      this.newComment.emit(res?.body)
      this.MatDialogRef.close();
    });
  }
  enter(i) {
    this.hoverState = i;
  }

  leave() {
    this.hoverState = 0;
  }

  updateRating(i) {
    this.rating = i;
  }
}
