import { HttpEventType, HttpResponse } from "@angular/common/http";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { UserService } from "../../../services/user.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-post",
  templateUrl: "./add-post.component.html",
  styleUrls: ["./add-post.component.css"],
})
export class AddPostComponent implements OnInit {
  selectedFiles: Array<string> = [];
  @ViewChild("file") private file: ElementRef;

  constructor(
    private service_user: UserService,
    @Inject(MAT_DIALOG_DATA) public datab: { _id },
    private MatDialogRef: MatDialogRef<AddPostComponent>
  ) {}

  ngOnInit(): void {}

  upload(file: File): void {
    if (file) {
      this.service_user.uploadVideo(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
          } else if (event instanceof HttpResponse) {
            this.selectedFiles.push(event.body);
            console.log(event.body);
            
          }
        },
        (err: any) => {}
      );
    }
  }

  selectFiles(event: any): void {
    this.upload(event.target.files[0]);
  }

  remove(url) {
    let i = this.selectedFiles.findIndex((e) => {
      return e == url;
    });

    this.selectedFiles.splice(i, 1);
    this.file.nativeElement.type = "text";
    this.file.nativeElement.type = "file";
  }

  onSubmit(data: any): void {
    data = JSON.parse(JSON.stringify(data));
    data.video = this.selectedFiles;
    data.user_id = this.datab._id;
    if (this.selectedFiles) {
      this.service_user.savePost(data).subscribe((res) => {
        this.MatDialogRef.close();
        Swal.fire({
          icon: 'success',
          title: 'Vous avez ajouter Une Publication',
          showConfirmButton: false,
          timer: 1000
        })
      });
    }
  }
}
