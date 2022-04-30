import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ActualLoginComponent} from "./actual-login/actual-login.component";
import {LoginComponent} from "./login/login.component";
import {TodoListComponent} from "../todo-list/todo-list.component";
import {AddtaskComponent} from "./addtask/addtask.component";
import {ModifyPageComponent} from "./modify-page/modify-page.component";
import {DeveloperInfoComponent} from "./developer-info/developer-info.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "login", component: ActualLoginComponent},
  {path: "register", component: LoginComponent},
  {path: "todolist", component: TodoListComponent},
  {path: "add", component: AddtaskComponent},
  {path: "modify/:id", component: ModifyPageComponent},
  {path: "developerInfo", component: DeveloperInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
