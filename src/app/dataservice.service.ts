import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import 'rxjs';
declare var $: any;
import { environment } from '../environments/environment';
export class Element {
  value: '';
  labels: '';
  constructor() {}
}
@Injectable({
  providedIn: 'root',
})
export class DataserviceService {
  public userName = '';
  public allmonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  public dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#98abc5',
          '#8a89a6',
          '#7b6888',
          '#6b486b',
          '#a05d56',
          '#d0743c',
          '#ff8c00',
        ],
      },
    ],
    labels: [],
  };
  public months = [];
  public data = [];
  public result;
  public setYear = '';
  public setMonth = '';
  public transactions = [];
  public UserData = [];
  public spentData = [];
  setyearMonth(monthyear) {
    let temp = monthyear.split(' ');
    this.setMonth = temp[0];
    this.setYear = temp[1];
  }
  constructor( public firebaseAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient) { }

    deleteTransactions(id: string, category: string, spent: string) {
      let token = localStorage.getItem('TOKEN');
      let uid = localStorage.getItem('uid');
      const params = {
        id: id,
        category: category,
        spent: spent,
        month: this.setMonth,
        year: this.setYear,
      };
      const promise = new Promise<void>((resolve, reject) => {
        this.http
          .post(
            environment.URL + ':3000/deleteTransactions',
            { params },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                uid: uid,
              },
            }
          )
          .toPromise()
          .then((res: any) => {
            resolve();
          })
          .catch((error: any) => {
            resolve();
            if (error.status == 401 || error.statusText == 'Unauthorized') {
              this.router.navigate(['/login']);
              this.removeBackdrop();
            }
          });
      });
      return promise;
    }
    addMonthToDB(month: string, year: string) {
      let token = localStorage.getItem('TOKEN');
      let uid = localStorage.getItem('uid');
      const params = {
        month: month,
        year: year,
        currMonth: this.setMonth,
        currYear: this.setYear,
      };
      const promise = new Promise<void>((resolve, reject) => {
        this.http
          .post(
            environment.URL + ':3000/addMonthtoDB',
            { params },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                uid: uid,
              },
            }
          )
          .toPromise()
          .then((res: any) => {
            resolve();
          })
          .catch((error: any) => {
            console.log(error);
            resolve();
            if (error.status == 401 || error.statusText == 'Unauthorized') {
              this.router.navigate(['/login']);
              this.removeBackdrop();
            }
          });
      });

      return promise;
    }
    removeBackdrop() {
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    }
    getDataFromFirebase() {
      this.spentData = [];
      this.UserData = [];
      this.transactions = [];

      this.dataSource.datasets[0].data = [];

      let token = localStorage.getItem('TOKEN');
      let uid = localStorage.getItem('uid');
      const promise = new Promise<void>((resolve, reject) => {
        this.http
          .get(environment.URL + ':3000/getAllData', {
            headers: {
              Authorization: `Bearer ${token}`,
              uid: uid,
            },
          })
          .toPromise()
          .then((res: any) => {
            this.months = [];
            let i = 0;
            for (let year in res) {
              if (year != 'email' && year != 'username') {
                for (let month in res[year]) {
                  this.months.push(month + ' ' + year);
                }
              }
            }
            if (!this.setMonth || !this.setYear) {
              const date = new Date();
              this.setMonth = this.allmonths[date.getUTCMonth()];
              this.setYear = date.getFullYear().toString();
            }
            const budgetData = res[this.setYear][this.setMonth]['Budget'];
            const expData = res[this.setYear][this.setMonth]['Expense'];
            for (let budget in budgetData) {
              this.dataSource.datasets[0].data[i] = budgetData[budget];
              this.dataSource.labels[i] = budget;
              this.spentData[i] = expData[budget];

              i++;
            }
            this.transactions = res[this.setYear][this.setMonth]['Transactions'];
            this.UserData = res[this.setYear][this.setMonth]['Budget'];
            this.userName = res['username'];
            resolve();
          })
          .catch((error: any) => {
            resolve();
            if (error.status == 401 || error.statusText == 'Unauthorized') {
              this.router.navigate(['/login']);
              this.removeBackdrop();
            }
          });
      });
      return promise;
    }
}

