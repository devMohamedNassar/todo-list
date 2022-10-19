import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.taskService.getAll().subscribe(tasks => this.tasks = tasks);
  }

  addTask(){
    const taskName = prompt('Enter your task name');
    if(taskName){
      const task = new Task(taskName);
      this.taskService.add(task).subscribe(
        {
          next: () => {
            alert('Your task added successfully');
            this.getTasks();
          },
          error: () => alert('Failed to add your task')
        }
      )
    }
  }

  onMarkAsDone(task: Task){
    if(task.done) return;
    this.taskService.update({...task, done: true}).subscribe(() => this.getTasks());
  }
  onDeleteTask(task: Task){
    const confirmed = confirm('Are you sure you want to delete this task?');
    if(!confirmed) return;
    this.taskService.delete(task.id).subscribe({
      next: () => {
        alert('Task deleted successfully')
        this.getTasks();
      },
      error: () => alert('Failed to delete the task')
    });
  }
  onEditTask(task: Task){
    const taskName = prompt('Edit your task name', task.name);
    if(!taskName) return;
    this.taskService.update({...task, name: taskName}).subscribe({
      next: () => {
        alert('Task updated successfully')
        this.getTasks();
      },
      error: () => alert('Failed to update the task')
    });
  }

}
