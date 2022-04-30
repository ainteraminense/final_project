import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DatabaseService} from "../services/database.service";
import {ToDo} from "../models/todo.models";
import {Status} from "../models/status.models";

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  todo: ToDo = new ToDo();
  status: Status[] = [];
  title = "Add Task"

  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.database.selectAllStatus().then((data) => {
      this.status = data;
    }).catch((error) => {
      console.error(error);
    });
  }

  btnAdd_Click() {
    if(localStorage.getItem("userEmail") != null) {
    this.database.insertToDo(this.todo,()=> { console.log("task added successfully")
    alert("task added");}
    );
    this.router.navigate(['todolist']);}
    else {
      this.router.navigate(['login']);
    }
  }

}
