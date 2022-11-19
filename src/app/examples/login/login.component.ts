import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { NgForm } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  User = {
    email: "",
    password: "",
  };

  constructor(
    private userService: UserService,
    private router: Router,
    public _snackBar: MatSnackBar
  ) {}
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  ngOnInit() {
    localStorage.clear();
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("login-page");
  }
  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      (res) => {
        this.userService.setToken(res["token"]);
        this.userService.me().subscribe((res: any) => {
          this.userService.getuserbyid(res.id).subscribe((e) => {
            localStorage.setItem("connectedUser", JSON.stringify(e));
            this.router.navigate(["examples/profile"]);
          });
        });
      },
      (err) => {
        this._snackBar.open(err.error, "close", { duration: 2000 });
      }
    );
    setTimeout(() => {
      window.location.reload()
    }, 250);
  }

  login() {
    this.router.navigate(["examples/acceuil"]);
  }
}
