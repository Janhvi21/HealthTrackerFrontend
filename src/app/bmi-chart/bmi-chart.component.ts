import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import * as CanvasJS from '../assets/canvasjs.min';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-bmi-chart',
  templateUrl: './bmi-chart.component.html',
  styleUrls: ['./bmi-chart.component.scss'],
})
export class BmiChartComponent implements OnInit, AfterViewInit {
  revenueColumnChart;
  chart;
  chartnew;
  constructor(public dataService: DataserviceService) {}
  title = 'canvasjs-angular';
  ngOnInit(): void {
    var totalRevenue = 15341110;
    let dataPoints = [
      { x: new Date('2018-03-01'), y: 85.3 },
      { x: new Date('2018-03-02'), y: 83.97 },
      { x: new Date('2018-03-05'), y: 83.49 },
      { x: new Date('2018-03-06'), y: 84.16 },
      { x: new Date('2018-03-07'), y: 84.86 },
      { x: new Date('2018-03-08'), y: 84.97 },
      { x: new Date('2018-03-09'), y: 85.13 },
      { x: new Date('2018-03-12'), y: 85.71 },
      { x: new Date('2018-03-13'), y: 84.63 },
      { x: new Date('2018-03-14'), y: 84.17 },
      { x: new Date('2018-03-15'), y: 85.12 },
      { x: new Date('2018-03-16'), y: 85.86 },
      { x: new Date('2018-03-19'), y: 85.17 },
      { x: new Date('2018-03-20'), y: 85.99 },
      { x: new Date('2018-03-21'), y: 86.1 },
      { x: new Date('2018-03-22'), y: 85.33 },
      { x: new Date('2018-03-23'), y: 84.18 },
      { x: new Date('2018-03-26'), y: 85.21 },
      { x: new Date('2018-03-27'), y: 85.81 },
      { x: new Date('2018-03-28'), y: 85.56 },
      { x: new Date('2018-03-29'), y: 88.15 },
    ];
    // CanvasJS column chart to show revenue from Jan 2015 - Dec 2015
    this.revenueColumnChart = new CanvasJS.Chart('revenue-column-chart', {
      animationEnabled: true,
      backgroundColor: 'transparent',
      theme: 'light2',
      axisX: {
        labelFontSize: 14,
        valueFormatString: 'MMM YYYY',
      },
      axisY: {
        labelFontSize: 14,
        prefix: '$',
      },
      toolTip: {
        borderThickness: 0,
        cornerRadius: 0,
      },
      data: [
        {
          type: 'column',
          yValueFormatString: '$###,###.##',
          dataPoints: [
            { x: new Date('1 Jan 2015'), y: 868800 },
            { x: new Date('1 Feb 2015'), y: 1071550 },
            { x: new Date('1 Mar 2015'), y: 1286200 },
            { x: new Date('1 Apr 2015'), y: 1106900 },
            { x: new Date('1 May 2015'), y: 1033800 },
            { x: new Date('1 Jun 2015'), y: 1017160 },
            { x: new Date('1 Jul 2015'), y: 1458000 },
            { x: new Date('1 Aug 2015'), y: 1165850 },
            { x: new Date('1 Sep 2015'), y: 1594150 },
            { x: new Date('1 Oct 2015'), y: 1501700 },
            { x: new Date('1 Nov 2015'), y: 1588400 },
            { x: new Date('1 Dec 2015'), y: 1648600 },
          ],
        },
      ],
    });


    this.chart = new CanvasJS.Chart('chartContainernew', {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: 'Stock Price of BMW - March 2018',
      },
      axisX: {
        valueFormatString: 'DD MMM',
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        },
      },
      axisY: {
        title: 'Closing Price (in EUR)',
        includeZero: false,
        valueFormatString: '€##0.00',
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          labelFormatter: function (e) {
            return '€' + CanvasJS.formatNumber(e.value, '##0.00');
          },
        },
      },
      data: [
        {
          type: 'area',
          xValueFormatString: 'DD MMM',
          yValueFormatString: '€##0.00',
          dataPoints: dataPoints,
        },
      ],
    });
    this.chartnew = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: 'BMI',
      },
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        },
      },
      axisY: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        },
      },
      data: [
        {
          dataPoints: dataPoints,
        },
      ],
    });
  }
  ngAfterViewInit(): void {
    this.revenueColumnChart.render();
    this.chart.render();
    this.chartnew.render();
  }
}
