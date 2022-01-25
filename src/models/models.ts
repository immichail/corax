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
  startTime: Date | undefined = new Date();
  creator: string | undefined;
  assignees: Array<Assignee> = [];

  constructor(obj: any) {
    this.id = obj.hasOwnProperty('id') ? obj.id : '';
    this.title = obj.hasOwnProperty('title') ? obj.title : '<Не удалось загрузить задачу>';
    this.description = obj.hasOwnProperty('description') ? obj.description : '<Не удалось загрузить задачу>';
    this.emailId = obj.hasOwnProperty('emailId') ? obj.emailId : '<Не удалось загрузить задачу>';
    this.emails = obj.hasOwnProperty('emails') ? obj.emails : [];
    this.assignees = obj.hasOwnProperty('assignees') ? obj.assignees.map((e: any) => e) : [];
    this.dueTime = obj.hasOwnProperty('dueTime') ? new Date(obj.dueTime) : undefined;
    this.startTime = obj.hasOwnProperty('startTime') ? new Date(obj.startTime) : undefined;
    this.creator = obj.hasOwnProperty('creator') ? obj.creator : undefined;
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
  recipients: Array<Sender> = []
  body: any = {};

  constructor(obj: any) {
    this.id = obj.hasOwnProperty('id') ? obj.id : '';
    this.subject = obj.hasOwnProperty('subject') ? obj.subject : '';
    this.sender = obj.hasOwnProperty('sender') ? new Sender(obj.sender) : new Sender({});
    this.body = obj.hasOwnProperty('body') ? obj.body : '';
    this.recipients = obj.hasOwnProperty('recipients') ? obj.recipients.map((e: any) => new Sender(e)) : '';
  }
}

function linearColor(s: any, e: any, p: number) {
  return `rgba(${(e.r - s.r) * p + s.r}, ${(e.g - s.g) * p + s.g}, ${(e.b - s.b) * p + s.b}, ${(e.a - s.a) * p + s.a})`
}

export { Assignee, Task, Email, Sender, linearColor };
