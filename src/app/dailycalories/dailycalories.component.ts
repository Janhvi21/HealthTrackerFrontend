import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { FormControl, FormGroup } from '@angular/forms';
import { isInteger, isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
@Component({
  selector: 'app-dailycalories',
  templateUrl: './dailycalories.component.html',
  styleUrls: ['./dailycalories.component.scss'],
})
export class DailycaloriesComponent implements OnInit, AfterViewChecked {
  constructor(public dataServices: DataserviceService) {}
  categories = ['Select', 'Breakfast', 'Lunch', 'Snacks', 'Dinner'];
  Category = 'Select';
  showform: boolean = false;
  calorieValues = [];
  headers = ['Date', 'Category', 'Details', 'Calorie Consumed'];
  ngOnInit(): void {
    /*for (let cat in this.dataServices.UserData) {
      this.categories.push(cat);
    }*/
    this.dataServices.getCalorieConsumption();
    setTimeout(() => {
      this.calorieValues = [];
      for (var data in this.dataServices.userCalorieConsumption) {
        for (var d in this.dataServices.userCalorieConsumption[data]) {
          if (
            typeof this.dataServices.userCalorieConsumption[data][d] ===
            'object'
          )
            this.calorieValues.push(
              this.dataServices.userCalorieConsumption[data][d]
            );
        }
      }
      console.log(this.calorieValues);
    }, 500);
  }
  ngAfterViewChecked(): void {}
  changeCards(form) {
    this.showform = !this.showform;
  }
  onAddMeal(Category: string, Date: Date, Detail: string, Calorie: number) {
    console.log(Category, Date, Detail, Calorie);
    this.showform = false;
    this.dataServices.addCalorieConsumption(Category, Date, Detail, Calorie);
    this.ngOnInit();
  }
  OnDelete(id: string, category: string, spent: string) {}
}
