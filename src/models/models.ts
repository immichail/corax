class Assignee {
  user_id: string = '';
  email: string = '';
  name: string = '';

  constructor(obj: any) {
    this.user_id = obj.hasOwnProperty('id') ? obj.user_id : '';
    this.email = obj.hasOwnProperty('email') ? obj.email : '';;
    this.name = obj.hasOwnProperty('name') ? obj.name : '';;
  }
}

class Task {
  id: string = '';
  title: string = '';
  description: string = '';
  emailId: string = '';
  emails: any;
  dueTime: Date | undefined = new Date();

  assignees: Array<Assignee> = [];

  constructor(obj: any) {
    this.id = obj.hasOwnProperty('id') ? obj.id : '';
    this.title = obj.hasOwnProperty('title') ? obj.title : '<Не удалось загрузить задачу>';
    this.description = obj.hasOwnProperty('description') ? obj.description : '<Не удалось загрузить задачу>';
    this.emailId = obj.hasOwnProperty('emailId') ? obj.emailId : '<Не удалось загрузить задачу>';
    this.emails = obj.hasOwnProperty('emails') ? obj.emails : [];
    this.assignees = obj.hasOwnProperty('assignees') ? obj.assignees.map((e: any) => new Assignee(e)) : '<Не удалось загрузить задачу>';
    this.dueTime = obj.hasOwnProperty('dueTime') ? new Date(obj.dueTime) : undefined;
  }
}

class Sender {
  name: string;
  email: string;

  constructor(obj: any) {
    this.name = obj.hasOwnProperty('name') ? obj.name : '';
    this.email = obj.hasOwnProperty('email') ? obj.email : '';
  }

}

class Email {
  id: string = ''
  subject: string = ''
  sender: Sender = new Sender({
    name: '<unknown>',
    email: '<unknown>'
  })
  body: any = {};

  constructor(obj: any) {
    this.id = obj.hasOwnProperty('id') ? obj.id : '';
    this.subject = obj.hasOwnProperty('subject') ? obj.subject : '';
    this.sender = obj.hasOwnProperty('sender') ? new Sender(obj.sender) : new Sender({});
    this.body = obj.hasOwnProperty('body') ? obj.body : '';
  }
}

export { Assignee, Task, Email, Sender };
