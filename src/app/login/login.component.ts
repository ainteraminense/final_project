import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.models";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";

declare const createDatabase: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  title = "Registration Form";
  db: any;

  constructor(private database: DatabaseService, private router: Router) {
  }

  ngOnInit(): void {
  }

  btnRegister_click(user: User){
    this.database.initDB();
    this.database.insert(user, ()=> {
      console.log("user successfully added"); alert("successfully added");
    });
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userFirstName", user.firstName);
    this.router.navigate(['home']);
  }
}
