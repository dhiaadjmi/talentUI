import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "app/examples/services/user.service";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  constructor(private router: Router, public users_service: UserService) {}
  myControl = new FormControl();
  users: string[] = [];
  selected: any;
  ids = [];
  sport = [];
  art = [];
  filteredOptions: Observable<string[]>;
  connectedUser: any;

  ngOnInit() {
    this.sport = ["Football", "Handball", "Basketball", "Volleyball"];
    this.art = ["chanteur", "Danceur", "Musicien", "Acteur"];
    this.users_service.getAll().subscribe((res: any) => {
      this.users = res.map((e) => {
        return e.userName;
      });
      this.ids = res.map((e) => {
        return e._id;
      });
      this.initFilter();
    });

    this.connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    this.admin()
  }

  initFilter() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  local() {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  admin(){
    if(this.connectedUser?.role === "admin"){
      return true
      
    }else{
      return false
    }
  }

  onSubmit(form): void {
    let index = this.users.findIndex((e) => {
      return e === this.selected;
    });

    if (index >= 0) {
      localStorage.setItem("selectedUser", JSON.stringify(this.ids[index]));
      if (window.location.pathname === "/examples/profile") {
        window.location.reload();
      } else {
        this.router.navigate(["/examples/profile"]);
      }
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/examples/login"]);
    setTimeout(() => {
      window.location.reload()
    }, 250);
  }

  login() {
    this.router.navigate(["/examples/login"]);
  }

  goToMyProfile() {
    localStorage.removeItem("selectedUser");
    this.router.navigate(["/examples/acceuil"]);
    setTimeout(() => {
      this.router.navigate(["/examples/profile"]);
    }, 1);
  }

  getSports(e: any) {
    localStorage.setItem("speciality", e.target.value);
    this.router.navigate(["/examples/acceuil"]);
    this.router.navigate(["/examples/sport"]);
  }

  getArts(e: any) {
    localStorage.setItem("speciality", e.target.value);
    this.router.navigate(["/examples/acceuil"]);
    this.router.navigate(["/examples/art"]);
  }

  deleteLocalStorage() {
    localStorage.removeItem("speciality");
  }
}
