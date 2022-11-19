import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(
    private httpclient: HttpClient,
  ) { }

  blockuser(data: any){
    return this.httpclient.put(environment.apiBaseUrl + "/users/block", data);
  }

  deletePost(id: number): Observable<any> {
    return this.httpclient.delete(environment.apiBaseUrl + "/posts/" + id);
  }
  // UpdateUser(_id, user) {
  //   return this.httpclient.put(environment.apiBaseUrl + "/users", _id, user);
  // }
}
