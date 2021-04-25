import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import * as CanvasJS from '../assets/canvasjs.min';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-bmi-chart',
  templateUrl: './bmi-chart.component.html',
  styleUrls: ['./bmi-chart.component.scss'],
})
export class BmiChartComponent implements OnInit, AfterViewInit {
  todaysCalorie: {};
  calorieIntakePerDay;
  comparisonChart;
  productsRevenuePieChart;
  points = [];
  breakfastPoints = [];
  lunchPoints = [];
  snacksPoints = [];
  dinnerPoints = [];
  constructor(
    public dataService: DataserviceService,
    public datepipe: DatePipe
  ) {}
  title = 'canvasjs-angular';
  ngOnInit(): void {
    this.calorieIntakePerDay = null;
    this.comparisonChart = null;
    this.productsRevenuePieChart = null;
    var date = new Date();
    let latest_date = this.datepipe.transform(date, 'yyyyMMdd');
    this.todaysCalorie = this.dataService.userCalorieConsumption
      ? this.dataService.userCalorieConsumption[latest_date]
      : null;

    for (var d in this.dataService.userCalorieConsumption) {
      let temp = { y: 0, label: '' };
      var str = new Date(
        d.substring(4, 6) +
          '/' +
          d.substring(6, d.length) +
          '/' +
          d.substring(0, 4)
      );
      temp.label = this.datepipe.transform(str, 'MMM dd yyyy');
      temp.y = this.dataService.userCalorieConsumption[d]['TotalCaloriePerDay'];
      this.points.push(temp);
      let temp1 = { y: 0, label: '' };
      temp1.label = this.datepipe.transform(str, 'MMM dd yyyy');
      temp1.y = this.dataService.userCalorieConsumption[d]['Breakfast']
        ? this.dataService.userCalorieConsumption[d]['Breakfast']
        : 0;
      this.breakfastPoints.push(temp1);
      let temp2 = { y: 0, label: '' };
      temp2.label = this.datepipe.transform(str, 'MMM dd yyyy');
      temp2.y = this.dataService.userCalorieConsumption[d]['Snacks']
        ? this.dataService.userCalorieConsumption[d]['Snacks']
        : 0;
      this.snacksPoints.push(temp2);
      let temp3 = { y: 0, label: '' };
      temp3.label = this.datepipe.transform(str, 'MMM dd yyyy');
      temp3.y = this.dataService.userCalorieConsumption[d]['Dinner']
        ? this.dataService.userCalorieConsumption[d]['Dinner']
        : 0;
      this.dinnerPoints.push(temp3);
      let temp4 = { y: 0, label: '' };
      temp4.label = this.datepipe.transform(str, 'MMM dd yyyy');
      temp4.y = this.dataService.userCalorieConsumption[d]['Lunch']
        ? this.dataService.userCalorieConsumption[d]['Lunch']
        : 0;
      this.lunchPoints.push(temp4);
    }

    // CanvasJS column chart to show revenue from Jan 2015 - Dec 2015
  }
  ngAfterViewInit(): void {
    if (this.todaysCalorie) {
      this.productsRevenuePieChart = new CanvasJS.Chart('meal-pie-chart', {
        animationEnabled: true,
        exportEnabled: true,
        theme: 'light2',
        legend: {
          fontSize: 14,
        },
        toolTip: {
          borderThickness: 0,
          content:
            "<span style='\"'color: {color};'\"'>{name}</span>: {y} Calories",
          cornerRadius: 0,
        },
        data: [
          {
            indexLabelFontColor: '#676464',
            indexLabelFontSize: 14,
            legendMarkerType: 'square',
            legendText: '{indexLabel}',
            showInLegend: true,
            startAngle: 90,
            type: 'pie',
            dataPoints: [
              {
                y: this.todaysCalorie['Breakfast']
                  ? this.todaysCalorie['Breakfast']
                  : 0,
                name: 'Breakfast',
                indexLabel: 'Breakfast - ' + this.todaysCalorie['Breakfast'],
                legendText: 'Breakfast',
                exploded: true,
              },
              {
                y: this.todaysCalorie['Lunch']
                  ? this.todaysCalorie['Lunch']
                  : 0,
                name: 'Lunch',
                indexLabel: 'Lunch - ' + this.todaysCalorie['Lunch'],
                legendText: 'Lunch',
              },
              {
                y: this.todaysCalorie['Snacks']
                  ? this.todaysCalorie['Snacks']
                  : 0,
                name: 'Snacks',
                indexLabel: 'Snacks - ' + this.todaysCalorie['Snacks'],
                legendText: 'Snacks',
                color: '#8064a1',
              },
              {
                y: this.todaysCalorie['Dinner']
                  ? this.todaysCalorie['Dinner']
                  : 0,
                name: 'Dinner',
                indexLabel: 'Dinner - ' + this.todaysCalorie['Dinner'],
                legendText: 'Dinner',
              },
            ],
          },
        ],
      });
      this.productsRevenuePieChart.render();
    }
    if (this.dataService.userCalorieConsumption) {
      this.calorieIntakePerDay = new CanvasJS.Chart('calorie-intake-per-day', {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: '',
        },
        toolTip: {
          borderThickness: 0,
          content: 'Total Calories {y}',
          cornerRadius: 0,
        },
        data: [
          {
            type: 'column',
            dataPoints: this.points,
          },
        ],
      });
      this.calorieIntakePerDay.render();
      this.comparisonChart = new CanvasJS.Chart('comparison-chart', {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: '',
        },
        axisY: {
          title: 'Calorie Consumptions',
          titleFontColor: '#4F81BC',
          lineColor: '#4F81BC',
          labelFontColor: '#4F81BC',
          tickColor: '#4F81BC',
        },
        toolTip: {
          shared: true,
        },
        legend: {
          cursor: 'pointer',
          itemclick: this.toggleDataSeries,
        },
        data: [
          {
            type: 'column',
            name: 'Breakfast Calorie Intake',
            legendText: 'Breakfast',
            showInLegend: true,
            dataPoints: this.breakfastPoints,
          },
          {
            type: 'column',
            name: 'Lunch Calorie Intake',
            legendText: 'Lunch',
            showInLegend: true,
            dataPoints: this.lunchPoints,
          },
          {
            type: 'column',
            name: 'Snacks Calorie Intake',
            legendText: 'Snacks',
            showInLegend: true,
            dataPoints: this.snacksPoints,
          },
          {
            type: 'column',
            name: 'Dinner Calorie Intake',
            legendText: 'Dinner',
            showInLegend: true,
            dataPoints: this.dinnerPoints,
          },
        ],
      });
      this.comparisonChart.render();
    }
  }
  toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.comparisonChart.render();
  }
}
