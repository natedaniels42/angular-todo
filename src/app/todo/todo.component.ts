import { Component, OnInit } from '@angular/core';
import { Todo } from './Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  list: Todo[] = localStorage['list'] ? JSON.parse(localStorage['list']) : [];
  
  valid: boolean = true;
  currentDate: number =  Date.now() / 1000;
  

  timeInterval = setInterval(() => {
    this.currentDate = Date.now() / 1000;
    this.list.forEach(todo => {
      if (!todo.completed) {
        todo.timeRemaining = this.setRemainingTime(todo.date)
      }
      })
  }, 1000) 
  constructor() { }

  setRemainingTime(date: string, current = this.currentDate): string {
    const time = (Date.parse(date) / 1000) - current;
    const days = Math.floor(time / (3600 * 24));
    const hours = Math.floor(time / 3600) % 24;
    const minutes = Math.floor(time / 60) % 60;
    const seconds = Math.floor(time % 60);
    if(hours > 0 || minutes > 0 || seconds > 0) {
      return `${days}days
        ${hours}hours
        ${minutes}minutes
        ${seconds}seconds`;
    } else {
      return 'Late';
    }
  }

  setCompleted(todo: Todo) {
    if (todo.completed) {
      todo.completed = false;
      todo.timeRemaining = this.setRemainingTime(todo.date);
      todo.onTime = null;
    } else {
      todo.completed = true;
      todo.timeRemaining = 'Done';
      
      if (Date.parse(todo.date) / 1000 > this.currentDate) {
        todo.onTime = true;
      } else {
        todo.onTime = false;
      }
    }
    console.log(todo.onTime);
  }

  addTodo(todo: string, date: string, $event: Event) {
    $event.preventDefault();

    if (todo !== '' && date !== '') {
      this.list.unshift({todo: todo, date: new Date(date).toLocaleString(), onTime: null, completed: false, timeRemaining: this.setRemainingTime(date)});
      localStorage['list'] = JSON.stringify(this.list);
      console.log(this.list);
      this.valid = true;
    } else {
      this.valid = false;
    }
  }

  deleteTodo(todo: Todo) {
    this.list = this.list.filter(item => item !== todo);
    localStorage['list'] = JSON.stringify(this.list);
    console.log(this.list);
  }

  ngOnInit(): void {
  }

}
