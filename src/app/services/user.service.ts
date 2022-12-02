import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = "https://localhost:7070/api/Users/"

  constructor(private httpService: HttpClient) {}

  getAllUsers() {
    let url = this.baseUrl + "GetAllUsers";
    return this.httpService.get(url);
  }

  createUser(user : User) {
    let url = this.baseUrl + "CreateUser";
    return this.httpService.post(url, user);
  }

  getUser(id : number) {
    let url = this.baseUrl + "GetUser/" +id;
    return this.httpService.get(url);
  }

  updateUser(user: User) {
    let url = this.baseUrl + "UpdateUser/" + user.id;
    return this.httpService.put(url, user);
  }

  deleteUser(id: number) {
    let url = this.baseUrl + "DeleteUser/" + id;
    return this.httpService.delete(url);
  }
}
 