import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { UserService } from "../../../../services/user.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-add-images",
  templateUrl: "./add-images.component.html",
  styleUrls: ["./add-images.component.css"],
})
export class AddImagesComponent implements OnInit {
  updateForm = this.formbuilder.group({});

  selectedFiles: Array<string> = [];
  constructor(
    private MatDialogRef: MatDialogRef<AddImagesComponent>,
    private service_user: UserService,
    public formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public datab: { _id; avatar; email; password; userName; images }
  ) {}

  ngOnInit(): void {}
  upload(file: File): void {
    if (file) {
      this.service_user.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
          } else if (event instanceof HttpResponse) {
            this.selectedFiles.push(event.body);
          }
        },
        (err: any) => {}
      );
    }
  }
  onSubmit(form:any): void {
    this.datab.images
    this.selectedFiles.forEach(element => {
      this.datab.images.push(element)
    });
    if (this.selectedFiles) {
      this.service_user.updateUser(this.datab._id, {...this.datab}).subscribe((res) => {
        this.MatDialogRef.close();
      });
    }
  }

  remove(url) {
    let i = this.selectedFiles.findIndex((e) => {
      return e == url;
    });

    this.selectedFiles.splice(i, 1);
  }

  selectFiles(event: any): void {
    this.upload(event.target.files[0]);
  }
}
