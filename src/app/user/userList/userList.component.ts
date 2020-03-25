import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

class User {
  email: string;
  id: string;
  password: string;
  roles: object;
  receivedMessage: object;
  sentMessage: object;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  error = null;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    }, error => {
      this.error = error.message;
    });
  }
}
