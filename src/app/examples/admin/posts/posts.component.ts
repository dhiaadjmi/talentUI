import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { AdminServiceService } from "../admin-service.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  listposts : []
  constructor(
    private _usersevice : UserService,
    private AdminServiceService: AdminServiceService
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this._usersevice.getallposts().subscribe(data=>{
      this.listposts = data;
      console.log(this.listposts);
      
    })
  }

  delete(id){
    this.AdminServiceService.deletePost(id).subscribe( res => [
      this.getAll()
    ])
  }
  
  deletePost(id) {
    Swal.fire({
      title: 'êtes-vous sûr?',
      text: "Supprimer la publication",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui'
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(id),
          Swal.fire({
            icon: 'success',
            title: 'la publication a éte Supprimer !',
            showConfirmButton: false,
            timer: 1000
          })
      }
    })
  }


}
