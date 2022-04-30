// cd /Users/sheila/Documents/CP-Conestoga/W22/PROG2430/FinalProject/ToDoApp_ArmandoInteraminense
// git add .
// git commit -m

import {Injectable} from '@angular/core';
import {User} from "../models/user.models";
import {ToDo} from "../models/todo.models";
import {Status} from "../models/status.models";

declare function openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess): any;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private db: any = null;

  constructor() {
  }

  public initDB(): void {
    if (this.db == null) {
      try {
        //create database
        this.createDatabase();
        //create tables
        this.createTables();
      } catch (e) {
        console.error("Error in initDB(): " + e);
      }
    }
  }

  getDatabase(): any {
    this.initDB();
    return this.db;
  }

  private static errorHandler(error): any {
    console.error("Error: " + error);
  }

  private createDatabase() {
    let shortName = "ToDoList";
    let version = "";
    let displayName = "DB for ToDo List App";
    let dbSize = 2 * 1024 * 1024;

    console.info("Creating database ...");

    function dbCreateSuccess() {
      console.info("Success: Database created successfully");
    }

    try {
      this.db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    } catch (e) {
      console.log("Error while creating database" + e.message);
    }
  }


  private createTables(): void {

    function txFunction(tx: any): void {
      console.log("creating user table");
      let sql = "CREATE TABLE IF NOT EXISTS users( " +
        " id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
        " firstName VARCHAR(20) NOT NULL, " +
        " lastName VARCHAR(20) NOT NULL, " +
        " email VARCHAR(20) NOT NULL, " +
        " password VARCHAR(20) NOT NULL);";
      let options = [];

      function successCallback() {
        console.info("Success: table created successfully");
      }

      tx.executeSql(sql, options, successCallback, DatabaseService.errorHandler);

    }

    function txFunctionToDo(tx: any): void {
      console.log("creating user table");
      let sql = "CREATE TABLE IF NOT EXISTS toDo( " +
        " id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
        " taskName VARCHAR(20) NOT NULL, " +
        " status VARCHAR(20) NOT NULL," +
        " dateCreated DATE NOT NULL," +
        " dateCompleted DATE);";
      let options = [];

      function successCallback() {
        console.info("Success: toDo table created successfully");
      }

      tx.executeSql(sql, options, successCallback, DatabaseService.errorHandler);
    }

    function txFunctionStatus(tx: any): void {
      console.log("creating status table");
      let sql ="CREATE TABLE IF NOT EXISTS status( "
        + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
        + "status VARCHAR(20) NOT NULL);";

      let options = [];

      function successTypeCallback() {
        console.info("Table status has been successfully created");
      }

      tx.executeSql(sql, options, successTypeCallback, DatabaseService.errorHandler);

    }

    function successTransaction() {
      console.info("Success: Create table transaction is successful");
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);

    this.getDatabase().transaction(txFunctionToDo, DatabaseService.errorHandler, successTransaction);

    this.getDatabase().transaction(txFunctionStatus, DatabaseService.errorHandler, successTransaction);
  }

  public insertStatus() {
    function txFunction(tx: any): void {
      let sql = "INSERT INTO status (id, status) VALUES (0,'Active');";
        /*"INSERT INTO status (id, status)" +
        "VALUES (1,'Completed');";*/
      let options = [];
      tx.executeSql(sql, options, () => {
        console.info("Table status has been successfully created");
      }, DatabaseService.errorHandler);
    }
      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: record added sucessfully");
      });
  }
  public insertStatus1() {
    function txFunction(tx: any): void {
      let sql = "INSERT INTO status (id, status) VALUES (1,'Completed');";
      /*"INSERT INTO status (id, status)" +
      "VALUES (1,'Completed');";*/
      let options = [];
      tx.executeSql(sql, options, () => {
        console.info("Table status has been successfully created");
      }, DatabaseService.errorHandler);
    }
    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: record added sucessfully");
    });
  }
  //CRUD Operations

  //insert
  public insert(user: User, callback) {
    function txFunction(tx: any): void {
      let sql = "INSERT INTO users(firstName, lastName, email, password) VALUES(?,?,?,?);";
      let options = [user.firstName, user.lastName, user.email, user.password];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: record added sucessfully");
    });
  }


  //select
  public selectAll(): Promise<any> {
    let options = [];
    let users: User[] = [];
    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM users;";
        tx.executeSql(sql, options, function (tx, results) {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let u = new User(row['firstName'], row['lastName'], row['email'], row['password']);
              u.id = row['id'];
              users.push(u);
            }
            resolve(users);
          } else {
            reject("No users found");
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: selectAll transaction successful");
      })
    });
  }

  //todo CRUD
  //insert
  public insertToDo(todo: ToDo, callback) {
    function txFunction(tx: any): void {
      let sql = "INSERT INTO todo(taskName, status, dateCreated, dateCompleted) VALUES(?,?,?,?);";
      let options = [todo.taskName, todo.status, todo.dateCreated, todo.dateCompleted];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: task added sucessfully");
    });
  }

  //selectAll
  public selectAllToDo(): Promise<any> {
    let options = [];
    let todos: ToDo[] = [];
    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM todo;";
        tx.executeSql(sql, options, function (tx, results) {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let u = new ToDo(row['taskName'], row['status'], row['dateCreated'], row['dateCompleted']);
              u.id = row['id'];
              todos.push(u);
            }
            resolve(todos);
          } else {
            reject("No todos found");
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: selectAllToDo transaction successful");
      })
    });
  }

  //select
  public select(id: number): Promise<any> {
    let options = [id];
    let todo: ToDo = null;

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM todo WHERE id=?;";
        tx.executeSql(sql, options, function (tx, results) {
          if (results.rows.length > 0) {
            let row = results.rows[0];
            let todo = new ToDo(row['taskName'],row['status'], row['dateCreated'], row['dateCompleted']);
            todo.id = row['id'];
            resolve(todo);
          } else {
            reject("Specific todo not found");
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction,
        DatabaseService.errorHandler, () => {
          console.log("Success: select transaction successful");
        })
    });
  }

  public update(todo: ToDo, callback) {
    function txFunction(tx: any): void {
      let sql = "UPDATE todo SET taskName=?, status=?,dateCreated=?, dateCompleted=?,  WHERE id=?;";
      let options = [todo.taskName, todo.status,todo.dateCreated,todo.dateCompleted, todo.id];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: update transaction successful");
    });
  }

  public delete(todo: ToDo, callback) {
    function txFunction(tx: any): void {
      let sql = "DELETE FROM todo WHERE id=?;";
      let options = [todo.id];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: delete transaction successful");
    });
  }

  public selectAllStatus(): Promise<any> {
    let options = [];
    let status: Status[] = [];
    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM status;";
        tx.executeSql(sql, options, function (tx, results) {
          if (results.rows.length > 0) {
            for (let i = 0; i < 2; i++) {
              let row = results.rows[i];
              let u = new Status(row['status']);
              u.id = row['id'];
              status.push(u);
            }
            resolve(status);
          } else {
            reject("No status found");
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: selectAll transaction successful");
      })
    });
  }
}
