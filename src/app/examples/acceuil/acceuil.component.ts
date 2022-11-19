import { Component, OnInit } from "@angular/core";
import { AddPostComponent } from "./dialogs/add-post/add-post.component";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-acceuil",
  templateUrl: "./acceuil.component.html",
  styleUrls: ["./acceuil.component.css"],
})
export class AcceuilComponent implements OnInit {
  posts = [];
  user: any;
  role : String;
  loading = false;
  dataLoading = false;

  constructor(
    private router: Router,
    private UserService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    localStorage.removeItem("selectedUser");
    this.loading = false;
    this.UserService.me().subscribe((res: any) => {
      this.UserService.getuserbyid(res.id).subscribe((e) => {
        this.user = e;
        this.role = this.user.role;
        localStorage.setItem("connectedUser", JSON.stringify(this.user));
        this.loading = true;
      });
    });
    let spec = localStorage.getItem("speciality");
    switch (window.location.pathname) {
      case "/examples/acceuil":
        this.getAll();
        break;
      case "/examples/sport":
        if (spec) {
          setInterval(() => {
            if (spec !== localStorage.getItem("speciality")) {
              spec = localStorage.getItem("speciality");
              this.filterSpec({
                speciality: spec,
              });
            }
          }, 1000);
          this.filterSpec({ speciality: spec });
        }
        break;
      case "/examples/art":
        if (spec) {
          setInterval(() => {
            if (spec !== localStorage.getItem("speciality")) {
              spec = localStorage.getItem("speciality");
              this.filterSpec({
                speciality: spec,
              });
            }
          }, 1000);
          this.filterSpec({ speciality: spec });
        }
        break;

      default:
        this.getSearch({
          search_text: window.location.pathname.substr(
            17,
            window.location.pathname.length
          ),
        });
        break;
    }
  }

  addpost(data) {
    let dia = this.dialog.open(AddPostComponent, { data });
    dia.afterClosed().subscribe(() => {
      this.getAll();
    });
  }

  getAll() {
    this.dataLoading = true;
    this.UserService.getallposts().subscribe((res) => {
      this.posts = res;
      this.dataLoading = false;
    });
  }

  getFilter(data: Object) {
    this.dataLoading = true;
    this.UserService.getFilterPosts(data).subscribe((res) => {
      this.posts = res.body;
      this.dataLoading = false;
    });
  }

  filterSpec(data: Object) {
    this.dataLoading = true;
    this.UserService.getFilterPostsSpeciality(data).subscribe((res) => {
      this.posts = res.body;
      this.dataLoading = false;
    });
  }

  getSearch(data: Object) {
    this.dataLoading = true;
    this.UserService.getSearch(data).subscribe((res) => {
      this.posts = res.body;
      this.dataLoading = false;
    });
  }
}
