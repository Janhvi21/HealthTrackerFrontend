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
  public userData = {};
  public userHealth = {};
  public userCalorieConsumption = {};
  constructor(
    public firebaseAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient
  ) {}

  /*deleteTransactions(id: string, category: string, spent: string) {
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
  }*/
  removeBackdrop() {
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }
  getDataFromFirebase() {
    let token = localStorage.getItem('TOKEN');
    let uid = localStorage.getItem('uid');
    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .get(environment.URL + ':3000/getUserInfo', {
          headers: {
            Authorization: `Bearer ${token}`,
            uid: uid,
          },
        })
        .toPromise()
        .then((res: any) => {
          console.log(res);
          this.userData = res;
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
  getHealthDataFromFirebase() {
    let token = localStorage.getItem('TOKEN');
    let uid = localStorage.getItem('uid');
    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .get(environment.URL + ':3000/getUserHealthInfo', {
          headers: {
            Authorization: `Bearer ${token}`,
            uid: uid,
          },
        })
        .toPromise()
        .then((res: any) => {
          this.userHealth = res;
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
  updateUser() {
    console.log(this.userData);
    let token = localStorage.getItem('TOKEN');
    let uid = localStorage.getItem('uid');
    const params = {
      user: this.userData,
    };
    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .post(
          environment.URL + ':3000/updateUser',
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
          console.log(res);
          if (res.firstName === this.userData['firstName']) {
            this.userData = res;
          }
          resolve();
        })
        .catch((error: any) => {
          resolve();
          if (error.status == 401 || error.statusText == 'Unauthorized') {
            this.router.navigate(['/profileview']);
            this.removeBackdrop();
          }
        });
    });
    return promise;
  }
  updateUserHealthInfo() {
    console.log(this.userData);
    let token = localStorage.getItem('TOKEN');
    let uid = localStorage.getItem('uid');
    const params = {
      user: this.userData,
    };
    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .post(
          environment.URL + ':3000/updateUserHealthInfo',
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
          this.userHealth = res;
          resolve();
        })
        .catch((error: any) => {
          resolve();
          if (error.status == 401 || error.statusText == 'Unauthorized') {
            this.router.navigate(['/profileview']);
            this.removeBackdrop();
          }
        });
    });
    return promise;
  }
  getCalorieConsumption() {
    let token = localStorage.getItem('TOKEN');
    let uid = localStorage.getItem('uid');
    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .get(
          environment.URL + ':3000/getCalorieConsumption',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              uid: uid,
            },
          }
        )
        .toPromise()
        .then((res: any) => {
          console.log(res);
          this.userCalorieConsumption=res;
          resolve();
        })
        .catch((error: any) => {
          resolve();
          if (error.status == 401 || error.statusText == 'Unauthorized') {
            //this.router.navigate(['/profileview']);
            this.removeBackdrop();
          }
        });
    });
    return promise;
  }
  addCalorieConsumption(Category, Date, Details, Calorie) {
    let token = localStorage.getItem('TOKEN');
    let uid = localStorage.getItem('uid');
    const params = {
      Category: Category,
      Date: Date,
      Details: Details,
      Calorie: Calorie,
    };
    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .post(
          environment.URL + ':3000/addCalorieConsumption',
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
          this.userCalorieConsumption=res;
          resolve();
        })
        .catch((error: any) => {
          resolve();
          if (error.status == 401 || error.statusText == 'Unauthorized') {
            //this.router.navigate(['/profileview']);
            this.removeBackdrop();
          }
        });
    });
    return promise;
  }
}
