import { Component, OnInit } from '@angular/core';
import e from 'express';
import { Task } from '../../model/task';
import { CrudService } from '../../service/crud.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, FormsModule],
  providers: [CrudService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.taskArr = [];
    this.taskObj = new Task();
    this.getAllTask();
  }
  getAllTask() {
    this.crudService.getAllTask().subscribe(
      (res) => {
        this.taskArr = res;
      },
      (err) => {
        alert('Unable to get list of tasks');
      }
    );
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      (err) => {
        alert(err);
      }
    );
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Failed to update task');
      }
    );
  }

  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Failed to delete task');
      }
    );
  }

  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
}
