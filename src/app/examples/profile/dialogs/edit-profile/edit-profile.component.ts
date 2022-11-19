import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { UserService } from "app/examples/services/user.service";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"],
})
export class EditProfileComponent implements OnInit {
  selectedFile: any;
  user: any;

  constructor(public service_user: UserService, private MatDialogRef: MatDialogRef<EditProfileComponent>,) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("connectedUser"));
    this.selectedFile = this.user.avatar;
  }

  onSubmit(form: any) {
    this.user.avatar = this.selectedFile;
    this.service_user.updateUser(this.user._id, { ...this.user }).subscribe((res) => {
      window.location.reload();

    });
  }

  remove() {
    this.selectedFile = null;
  }

  upload(file: File): void {
    if (file) {
      this.service_user.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
          } else if (event instanceof HttpResponse) {
            this.selectedFile = "http://localhost:8081//" + event.body;
          }
        },
        (err: any) => { }
      );
    }
  }

  selectFiles(event: any): void {
    this.upload(event.target.files[0]);
  }
}
