import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { AdminServiceService } from "../admin-service.service";
import Swal from "sweetalert2";
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any ;

  constructor( private _userService : UserService, private AdminServiceService: AdminServiceService) { }

  ngOnInit(): void {
   this.getAll()
  }

  getAll(){
    this._userService.getAll().subscribe(res => {
      this.users = res ;
      console.log(this.users);
    })
  }

  block(id){
    let req = {
        id : id,
        status: 1
    }
    this.AdminServiceService.blockuser(req).subscribe(res => {
      this.getAll()
    })
    Swal.fire({
      icon: 'warning',
      title: 'Un utilisateur a été bloquer ',
      showConfirmButton: false,
      timer: 2000
    })

  }

  unblock(id){
    let req = {
        id : id,
        status: 0
    }
    this.AdminServiceService.blockuser(req).subscribe(res => {
      this.getAll()
    })
    Swal.fire({
      icon: 'success',
      title: 'Un utilisateur a été Débloquer ',
      showConfirmButton: false,
      timer: 2000
    })
    
  }

  findme(e: any){
    // console.log(findme);
    
    // this.users = this.users.filter((item: any) => {
    //   if (item.userName) {
    //     return (item.userName as string).toLowerCase().includes(search.toLowerCase());
    //   } else {
    //     return null;
    //   }
    // });
  }

}
