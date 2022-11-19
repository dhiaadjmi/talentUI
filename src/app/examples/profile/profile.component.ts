import { Component, OnInit } from "@angular/core";
import * as Rellax from "rellax";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { EditProfileComponent } from "./dialogs/edit-profile/edit-profile.component";
import { UserService } from "../services/user.service";
import { AddImagesComponent } from "./dialogs/add-images/add-images/add-images.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  zoom: number = 14;
  lat: number = 44.445248;
  lng: number = 26.099672;
  user: any;
  connectedUser: any;
  styles: any[] = [
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }, { lightness: 17 }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }, { lightness: 18 }],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }, { lightness: 16 }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }, { lightness: 21 }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#dedede" }, { lightness: 21 }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }],
    },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#f2f2f2" }, { lightness: 19 }],
    },
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [{ color: "#fefefe" }, { lightness: 20 }],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }],
    },
  ];
  data: Date = new Date();
  focus;
  focus1;
  loading = false;
  roleS = false;

  constructor(
    private UserService: UserService,
    private Route: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    this.visit()
    if(this.connectedUser!=null)
    if(this.connectedUser.role === 'admin'){
      this.Route.navigate(["admin/users"]);   
    }
    let selectedUser = JSON.parse(localStorage.getItem("selectedUser"));
    console.log(selectedUser);
    this.loading = true;
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    
    if (selectedUser && selectedUser !== this.connectedUser?._id) {
      this.UserService.getuserbyid(
        JSON.parse(localStorage.getItem("selectedUser"))
      ).subscribe((res: any) => {
        this.user = res;
        this.loading = false;
      });
    } else if (this.connectedUser) {
      this.UserService.me().subscribe((res: any) => {
        this.UserService.getuserbyid(res.id).subscribe((e) => {
          this.user = e;
          localStorage.setItem("connectedUser", JSON.stringify(this.user));
          this.loading = false;
        });
      });
    } else {
      this.Route.navigate(["/examples/acceuil"]);
    }
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }

  message() {
    this.Route.navigate(["examples/messages"]);
  }

  editporifle() {
    let dia = this.dialog.open(EditProfileComponent);
    dia.afterClosed().subscribe(() => {});
  }

  visit(){
    if(this.connectedUser!=null)
    if(this.connectedUser.role === 'viseur'){
      console.log('meh');
      return true
    }else{
      false
    }
    false
  }

  addPhotos(data) {
    let dia = this.dialog.open(AddImagesComponent, { data });
    dia.afterClosed().subscribe(() => {});
  }
}
