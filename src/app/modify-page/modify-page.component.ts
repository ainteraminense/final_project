import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DatabaseService} from "../services/database.service";
import {ToDo} from "../models/todo.models";

@Component({
  selector: 'app-modify-page',
  templateUrl: './modify-page.component.html',
  styleUrls: ['./modify-page.component.css']
})
export class ModifyPageComponent implements OnInit {
  todo: ToDo = new ToDo();
  title = "Modify Task"
  constructor(private database: DatabaseService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.database.select(id)
      .then((data)=>{
        console.info(data);
        this.todo=data;
      })
      .catch((e)=>{
        console.error(e);
      });
  }

  btnUpdate_click(){
    this.database.update(this.todo, ()=>{
      console.log("Record updated successfully");
      alert("Record updated successfully");
    });
  }

}
