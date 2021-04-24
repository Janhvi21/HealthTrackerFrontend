import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-dailycalories',
  templateUrl: './dailycalories.component.html',
  styleUrls: ['./dailycalories.component.scss']
})
export class DailycaloriesComponent implements OnInit {

  constructor(public dataServices: DataserviceService) {}
  headers = [];
  transaction = [];
  categories = [];
  Category = '';
  Date = new Date();
  Details = '';
  Spent = 0;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  showform: boolean = false;

  ngOnInit(): void {
    this.headers = [];
    this.categories = [];
    if (
      this.dataServices.transactions &&
      this.dataServices.transactions.length > 0
    ) {
      for (let row in this.dataServices.transactions[0]) {
        this.headers.push(row);
      }
    }
    for (let cat in this.dataServices.UserData) {
      this.categories.push(cat);
    }
  }
  changeCards(form) {
    this.showform = !this.showform;
  }
  onAddTransaction(
    Category: string,
    Date: Date,
    Detail: string,
    Spent: number
  ) {

    this.showform = false;
  }
  OnDelete(id: string, category: string, spent: string) {

  }
}
