import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { UserService } from "app/examples/services/user.service";
import { AddCommentComponent } from "../dialogs/add-comment/add-comment.component";
import Swal from 'sweetalert2';

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"],
})
export class PostComponent implements OnInit {
  @Input("item") item: any;

  extanded: Boolean = false;
  user: any;
  constructor(
    private service_user: UserService,
    private dialog: MatDialog,
    public router: Router
  ) { }

  comments: any;
  showedComments: any;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("connectedUser"));
    this.comments = this.item.comments;

    this.showLess();

    let videoPlayerId = "videoPlayer" + this.item._id;
    let timer = setInterval(() => {
      var vid: any = document.getElementById(videoPlayerId);

      let self = this;
      vid.onplay = function () {
        if (vid.currentTime === 0) {
          self.item.views++;
          self.service_user
            .incrementViews({ post_id: self.item._id })
            .subscribe((res) => { });
        }
      };
      if (vid) {
        clearInterval(timer);
      }
    }, 500);
  }

  showMore() {
    this.showedComments = this.comments;
    this.extanded = true;
  }
  showLess() {
    this.showedComments = this.comments.length > 0 ? [this.comments[0]] : [];
    this.extanded = false;
  }
  goToUser(user) {
    localStorage.setItem("selectedUser", JSON.stringify(user._id));
    this.router.navigate(["examples/profile"]);
  }
  addComment(obj) {
    var commented=false;
    this.comments.forEach((item) => {
      if(item.user._id==this.user._id)
      { Swal.fire({
        icon: 'warning',
        title: 'Vous avez déja évaluer la publication',
        showConfirmButton: false,
        timer: 2000
      })
      commented=true;
      }
    });

    if(!commented)
    {const dialogRef = this.dialog.open(AddCommentComponent, {
      data: { post: obj },
    });
  
    dialogRef.componentInstance.newComment.subscribe((res: any) => {
      if (res?._id) {
        this.showedComments.push(res);
      }
    });
  }
}

  deletePost() {
    Swal.fire({
      title: 'êtes-vous sûr?',
      text: "Supprimer La Publication",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui'
    }).then((result) => {
      if (result.isConfirmed) {
        this.supp(),
          Swal.fire({
            icon: 'success',
            title: 'La Publication a éte Supprimer !',
            showConfirmButton: false,
            timer: 1000
          })
      }
    })
  }


  supp() {
    this.service_user.deletePost(this.item._id).subscribe((res: any) => {
      window.location.reload()
    })
  }

  report() {
    this.service_user.reportPost({ id: this.item._id, status: 1 }).subscribe((res: any) => {
      window.location.reload()
    })
  }

  reportPost() {
    Swal.fire({
      title: 'êtes-vous sûr?',
      text: "Signaler La Publication",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui'
    }).then((result) => {
      if (result.isConfirmed) {
        this.report(),
          Swal.fire({
            icon: 'success',
            title: 'La Publication a été Signaler',
            showConfirmButton: false,
            timer: 1000
          })
      }
    })
  }
}
