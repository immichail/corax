import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiUrl = 'http://jupyter.infra.cspfmba.ru:11051/corax'

  constructor(private http: HttpClient) { }

  getEmails(user_id: string) {
    return this.http.post(this.apiUrl + '/emails', {user_id: user_id})
  }

  getProjects(user_id: string) {
    return this.http.post(this.apiUrl + '/project/list', {
      user_id: '1',
    })
  }

  getTask(task_id: string) {
    return this.http.post(this.apiUrl + '/task', {
      user_id: '1',
      task_id: task_id
    })
  }


  getProjectTasks(user_id: string, project_id: string) {
    return this.http.post(this.apiUrl + '/project/tasks', {
      user_id: '1',
      project_id: project_id
    })
  }

  addProject(project: any) {
    return this.http.post(this.apiUrl + '/project/add', {
      user_id: '1',
      project: project
    })
  }

  editProject(project: any) {
    return this.http.post(this.apiUrl + '/project/edit', {
      user_id: '1',
      project: project
    })
  }

  addTask(project_id: string, task: any) {
    return this.http.post(this.apiUrl + '/task/add', {
      'user_id': '1',
      'project_id': project_id,
      'task': task
    })
  }

  editTask(task: any) {
    return this.http.post(this.apiUrl + '/task/edit', {
      user_id: '1',
      task: task
    })
  }

  deleteTask(task_id: string) {
    return this.http.post(this.apiUrl + '/task/delete', {
      user_id: '1',
      task_id: task_id
    })
  }

  getEmail(message_id: string) {
    return this.http.post(this.apiUrl + '/email', {
      user_id: '1',
      message_id: message_id
    })
  }

  addAssignee(task_id: string, assignee_email: string) {
    return this.http.post(this.apiUrl + '/task/assign', {
      user_id: '1',
      task_id: task_id,
      assignee_email: assignee_email
    })
  }

  getDependant(user_id: string) {
    return this.http.post(this.apiUrl + '/user/dependant', {
      user_id: user_id
    })
  }
}
