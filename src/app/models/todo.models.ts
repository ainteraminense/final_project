export class ToDo {
  id: number = -1;
  taskName: string = "";
  status: string = "";
  dateCreated: any = "";
  dateCompleted: any = "";

  constructor(taskName? : string, status?: string, dateCreated?: any, dateCompleted?: any) {
    this.taskName = taskName;
    this.status = status;
    this.dateCreated = dateCreated;
    this.dateCompleted = dateCompleted;
  }
}
