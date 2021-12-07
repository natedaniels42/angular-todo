import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  list: {
    todo: string, 
    date: string, 
    completed: boolean,
    timeRemaining: string}[] = localStorage['list'] ? JSON.parse(localStorage['list']) : [];
  currentDate: number =  Date.now() / 1000;
  timeInterval = setInterval(() => {
    this.currentDate = Date.now() / 1000;
    this.list.forEach(todo => todo.timeRemaining = this.setRemainingTime(todo.date))
  }, 1000) 
  constructor() { }

  setRemainingTime(date: string, current = this.currentDate): string {
    const time = (Date.parse(date) / 1000) - current;
    console.log(time);
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60) % 60;
    const seconds = Math.floor(time % 60);
    return `${hours}:${minutes}:${seconds}`;
  }

  addTodo(todo: string, date: string) {
    this.list.push({todo: todo, date: new Date(date).toLocaleString(), completed: false, timeRemaining: this.setRemainingTime(date)});
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
