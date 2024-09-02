import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  toDoForm: FormGroup;
  todos: Todo[] = [];

  constructor(private fb: FormBuilder) {
    this.toDoForm = this.fb.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  addTodo() {
    if (this.toDoForm.valid) {
      const newTodo: Todo = {
        title: this.toDoForm.value.taskName,
        description: this.toDoForm.value.taskDescription,
        completed: false
      };
      this.todos.push(newTodo);
      this.toDoForm.reset(); // Reset the form after adding a todo
    }
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
  }
}
