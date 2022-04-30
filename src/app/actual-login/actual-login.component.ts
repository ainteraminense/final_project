import {Component, OnInit} from '@angular/core';
import {User} from "../models/user.models";
import {Router} from "@angular/router";
import {DatabaseService} from "../services/database.service";

@Component({
  selector: 'app-actual-login',
  templateUrl: './actual-login.component.html',
  styleUrls: ['./actual-login.component.css']
})
export class ActualLoginComponent implements OnInit {

  user: User = new User();
  users: User[] = [];
  title = "Login";

  constructor(private database: DatabaseService, private router: Router) {
  }

  ngOnInit(): void {
    this.database.selectAll().then((data) => {
      this.users = data;
    }).catch((error) => {
      console.error(error);
    });
  }

  btnLogin_click(user: User) {

    if (this.users.length > 0) {
      for (let i = 0; i < this.users.length; i++) {
        if ((user.email == this.users[i].email) && (user.password == this.users[i].password)) {
          localStorage.setItem("userEmail", user.email);
          localStorage.setItem("userFirstName", this.users[i].firstName);
          this.router.navigate(['home']);
        } else {
          alert("Password or Login doesn't exist");
        }
      }
    }
    else
    {
      alert("Password or Login doesn't exist");
    }
  }


}
