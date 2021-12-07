import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  list: {todo: string, date: string, completed: boolean}[] = localStorage['list'] ? JSON.parse(localStorage['list']) : [];

  constructor() { }

  addTodo(todo: string, date: string) {
    this.list.push({todo: todo, date: new Date(date).toLocaleString(), completed: false});
    localStorage['list'] = JSON.stringify(this.list);
    console.log(this.list);
  }

  deleteTodo(todo: {todo: string, date: string, completed: boolean}) {
    this.list = this.list.filter(item => item !== todo);
    localStorage['list'] = JSON.stringify(this.list);
    console.log(this.list);
  }

  ngOnInit(): void {
  }

}
