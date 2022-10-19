import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() task!: Task;
  @Output() markAsDone = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() editTask = new EventEmitter<Task>();

  constructor() { }

  ngOnInit(): void {
  }

}
