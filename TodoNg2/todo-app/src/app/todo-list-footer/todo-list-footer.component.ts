import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo';

@Component({
  moduleId: module.id,
  selector: 'app-todo-list-footer',
  templateUrl: 'todo-list-footer.component.html',
  styleUrls: ['todo-list-footer.component.css']
})
export class TodoListFooterComponent implements OnInit {
  @Input()
  todos: Todo[];

  constructor() { }

  ngOnInit() {
  }

}
