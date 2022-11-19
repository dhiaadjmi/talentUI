import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../../../environments/environment";
import { User } from "../sign-up/model/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  selectedUser: User = {
    _id: "",
    userName: "",
    email: "",
    password: "",
    role: "",
    category: "",
    speciality: "",
    avatar: "",
    desc: "",
    images: [""],
  };

  constructor(private httpclient: HttpClient) {}
  //read

  login(authCredentials) {
    return this.httpclient.post(
      environment.apiBaseUrl + "/auth/login",
      authCredentials
    );
  }
  getUser(): Observable<any> {
    return this.httpclient.get(environment.apiBaseUrl + "/users");
  }
  //delete
  deleteUser(_id) {
    return this.httpclient.delete(environment.apiBaseUrl + "/users", _id);
  }
  //create
  addUser(user: User) {
    return this.httpclient.post(environment.apiBaseUrl + "/users", user);

    //update
  }
  UpdateUser(_id, user) {
    return this.httpclient.put(environment.apiBaseUrl + "/users", _id, user);
  }

  getuserbyid(id) {
    return this.httpclient.get(environment.apiBaseUrl + "/users/" + id);
  }

  getAll() {
    return this.httpclient.get(environment.apiBaseUrl + "/users");
  }

  deletePost(id: number): Observable<any> {
    return this.httpclient.delete(environment.apiBaseUrl + "/posts/" + id);
  }

  reportPost(data: any): Observable<any> {
    return this.httpclient.put(environment.apiBaseUrl + "/posts/report", data);
  }

  me() {
    return this.httpclient.get(environment.apiBaseUrl + "/auth/me", {
      headers: { "x-access-token": localStorage.getItem("token") },
    });
  }
  //Helper Methods

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  deleteToken() {
    localStorage.removeItem("token");
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split(".")[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append("images", file);
    const req = new HttpRequest(
      "POST",
      `${environment.apiBaseUrl}` + "/users/images",
      formData,
      {
        reportProgress: true,
        responseType: "json",
      }
    );

    return this.httpclient.request(req);
  }

  uploadVideo(file) {
    const formData: FormData = new FormData();
    formData.append("video", file);
    const req = new HttpRequest(
      "POST",
      `${environment.apiBaseUrl}` + "/posts/uploadVideo",
      formData,
      {
        reportProgress: true,
        responseType: "json",
      }
    );

    return this.httpclient.request(req);
  }
  savePost(data) {
    const req = new HttpRequest(
      "POST",
      `${environment.apiBaseUrl}` + "/posts",
      data,
      {
        reportProgress: true,
        responseType: "json",
      }
    );

    return this.httpclient.request(req);
  }

  saveUser(user: User) {
    const req = new HttpRequest(
      "POST",
      `${environment.apiBaseUrl}` + "/users",
      user,
      {
        reportProgress: true,
        responseType: "json",
      }
    );

    return this.httpclient.request(req);
  }

  updateUser(_id, data: object) {
    const req = new HttpRequest(
      "PUT",
      `${environment.apiBaseUrl}` + "/users/" + `${_id}`,
      data,
      {
        reportProgress: true,
        responseType: "json",
      }
    );
    return this.httpclient.request(req);
  }

  getallposts(): Observable<any> {
    return this.httpclient.get(environment.apiBaseUrl + "/posts");
  }

  getFilterPosts(data): Observable<any> {
    const req = new HttpRequest(
      "POST",
      `${environment.apiBaseUrl}` + "/posts/filter_posts",
      data
    );

    return this.httpclient.request(req);
  }

  getFilterPostsSpeciality(data): Observable<any> {
    const req = new HttpRequest(
      "POST",
      `${environment.apiBaseUrl}` + "/posts/filter_posts_by_speciality",
      data
    );

    return this.httpclient.request(req);
  }

  getSearch(data): Observable<any> {
    const req = new HttpRequest(
      "POST",
      `${environment.apiBaseUrl}` + "/posts/filter_posts_by_username",
      data
    );

    return this.httpclient.request(req);
  }

  incrementViews(data) {
    const req = new HttpRequest(
      "PUT",
      `${environment.apiBaseUrl}` + "/posts",
      data,
      {
        reportProgress: true,
        responseType: "json",
      }
    );

    return this.httpclient.request(req);
  }

  saveComment(data) {
    const req = new HttpRequest(
      "POST",
      `${environment.apiBaseUrl}` + "/comments",
      data,
      {
        reportProgress: true,
        responseType: "json",
      }
    );

    return this.httpclient.request(req);
  }
}
