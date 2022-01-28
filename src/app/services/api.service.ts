import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Sender} from "../../models/models";
import {GlobalStateService} from "./global-state.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiUrl = 'http://jupyter.infra.cspfmba.ru:11051/corax'

  constructor(private http: HttpClient, private globalState: GlobalStateService) { }

  login(email: string, password: string) {
    return this.http.post(this.apiUrl + '/login', {
      email: email,
      password: password
    })
  }

  checkUser(user_id: string) {
    return this.http.post(this.apiUrl + '/user/check', {
      user_id: user_id
    })
  }


  getEmails() {
    return this.http.post(this.apiUrl + '/emails', {
      user_id: this.globalState.user_id
    })
  }

  getProjects() {
    return this.http.post(this.apiUrl + '/project/list', {
      user_id: this.globalState.user_id,
    })
  }

  getTask(task_id: string) {
    return this.http.post(this.apiUrl + '/task', {
      user_id: this.globalState.user_id,
      task_id: task_id
    })
  }


  getProjectTasks(project_id: string) {
    return this.http.post(this.apiUrl + '/project/tasks', {
      user_id: this.globalState.user_id,
      project_id: project_id
    })
  }

  addProject(project: any) {
    return this.http.post(this.apiUrl + '/project/add', {
      user_id: this.globalState.user_id,
      project: project
    })
  }

  editProject(project: any) {
    return this.http.post(this.apiUrl + '/project/edit', {
      user_id: this.globalState.user_id,
      project: project
    })
  }

  addTask(project_id: string, task: any) {

    if (!task.hasOwnProperty('startTime')) {
      task.startTime = Date.now();
    }
    if (!task.hasOwnProperty('creator')) {
      task.creator = this.globalState.user_id;
    }

    return this.http.post(this.apiUrl + '/task/add', {
      'user_id': this.globalState.user_id,
      'project_id': project_id,
      'task': task
    })
  }

  editTask(task: any) {
    return this.http.post(this.apiUrl + '/task/edit', {
      user_id: this.globalState.user_id,
      task: task
    })
  }

  deleteTask(task_id: string) {
    return this.http.post(this.apiUrl + '/task/delete', {
      user_id: this.globalState.user_id,
      task_id: task_id
    })
  }

  doneTask(task_id: string) {
    return this.http.post(this.apiUrl + '/task/done', {
      user_id: this.globalState.user_id,
      task_id: task_id
    })
  }

  getEmail(message_id: string) {
    return this.http.post(this.apiUrl + '/email', {
      user_id: this.globalState.user_id,
      message_id: message_id
    })
  }

  addAssignee(task_id: string, assignee_email: string) {
    return this.http.post(this.apiUrl + '/task/assign', {
      user_id: this.globalState.user_id,
      task_id: task_id,
      assignee_email: assignee_email
    })
  }

  getDependant(user_id: string) {
    return this.http.post(this.apiUrl + '/user/dependant', {
      user_id: user_id
    })
  }

  getEmailBody(message_id : string) {
    return this.http.post(this.apiUrl + '/email/body', {
      user_id: this.globalState.user_id,
      message_id: message_id
    })
  }

  replyEmail(message_id : string, body: string, recipients: Array<Sender>) {
    return this.http.post(this.apiUrl + '/email/reply', {
      user_id: this.globalState.user_id,
      message_id: message_id,
      body: body,
      recipients: recipients.map((e: Sender) => {
        return {name: e.name, email: e.email}
      })
    })
  }

  getIncomingTasks(user_id: string) {
    return this.http.post(this.apiUrl + '/task/incoming', {
      user_id: this.globalState.user_id
    })
  }

  acceptTask(task_id: string) {
    return this.http.post(this.apiUrl + '/task/accept', {
      user_id: this.globalState.user_id,
      task_id: task_id
    })
  }

  getChildrenTask(task_id: string) {
    return this.http.post(this.apiUrl + '/task/children', {
      user_id: this.globalState.user_id,
      task_id: task_id
    })
  }
}
