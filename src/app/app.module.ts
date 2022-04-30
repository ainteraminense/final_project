import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule} from "@angular/forms";
import { ActualLoginComponent } from './actual-login/actual-login.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { ModifyPageComponent } from './modify-page/modify-page.component';
import { DeveloperInfoComponent } from './developer-info/developer-info.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    ActualLoginComponent,
    AddtaskComponent,
    ModifyPageComponent,
    DeveloperInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
