import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DatabaseService} from "../app/services/database.service";
import {ToDo} from "../app/models/todo.models";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  title = "ToDo List";
  todo: ToDo = new ToDo();
  todos: ToDo[] = [];
  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    const emptyMessage = document.getElementById("emptyMessage");

    this.database.selectAllToDo().then((data) => {
      this.todos = data;
    }).catch((error) => {
      emptyMessage.hidden = false;
      emptyMessage.textContent = "Your List is Empty.";
      console.error(error);
    });
  }

  btnEdit_Click(todo: ToDo) {
    this.router.navigate(['modify/'+ todo.id]);
  }

  btnDelete_click(todo: ToDo){
    this.database.delete(todo, ()=>{
      console.log("Task deleted successfully");
      alert("Task deleted successfully");
    });

    this.ngOnInit();
  }
}
