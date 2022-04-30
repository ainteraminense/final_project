import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.models";
import {Router} from "@angular/router";
import {DatabaseService} from "../services/database.service";

declare function capturePhoto(): any;
declare function captureEditablePhoto(): any;
declare function loadFromPhotoLibrary(): any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ImagePath: string;
  user: User = new User();
  db: any;

  constructor(private database: DatabaseService, private router: Router) {
    this.ImagePath = '/assets/img/todo.jpg'
  }

  ngOnInit(): void {
    this.database.initDB();
    this.database.insertStatus();
    this.database.insertStatus1();
  this.getUserName();
  }
  getUserName() {
    if (localStorage.getItem("userEmail"))
    {
      this.user.firstName = localStorage.getItem("userFirstName");
      console.log("user is " + localStorage.getItem("userEmail"));
      this.router.navigate(['home']);
    }
    else
    {
      console.log("theres no user " + localStorage.getItem("userEmail"));
      this.router.navigate(['login']);
    }
  }

  btnCapturePhoto_click() {
    alert("hello");
    capturePhoto();
  }
  btnCapturePhotoEdit_click() {
    captureEditablePhoto();
  }

  btnLoadFromLibrary_click() {
    loadFromPhotoLibrary();
  }

}

