import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
interface Doctor {
  _id: String;
  name: String;
  specialization: String;
  rates: Number[];
  address: String;
  fees: Number;
  phone: Number;
  duration: Number;
  img: String;
  availableHours: Number[];
  __v: Number;
}
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  public getBackendData(): Observable<Object> {
    return this.http.get(environment.url);
  }
  public loginUser(data: any): Observable<Object> {
    const url: any = `${environment.base_url}${environment.login}`;
    return this.http.post(url, data, { withCredentials: true });
  }
  public signUp(data: any): Observable<Object> {
    const url: any = `${environment.base_url}${environment.signup}`;
    return this.http.post(url, data, { withCredentials: true });
  }
  public logoutUser(): Observable<Object> {
    const url: any = `${environment.base_url}${environment.logout}`;
    return this.http.post(url, { order: 'Delete' }, { withCredentials: true });
  }
  public getDoctors(): Observable<Object> {
    const url: any = `${environment.base_url}${environment.doctors}`;
    return this.http.get(url, { withCredentials: true });
  }
  public addDoctor(data: any): Observable<Object> {
    const url: any = `${environment.base_url}${environment.doctors}`;
    return this.http.post(url, data, { withCredentials: true });
  }
  public getUsers(): Observable<Object> {
    const url: any = `${environment.base_url}${environment.users}`;
    return this.http.get(url, { withCredentials: true });
  }
  public deleteUser(data: any): Observable<Object> {
    const url: any = `${environment.base_url}veseeta/users/${data}`;
    return this.http.delete(url, { withCredentials: true });
  }
  public deleteDoctor(data: any): Observable<Object> {
    const url: any = `${environment.base_url}veseeta/doctors/${data}`;
    return this.http.delete(url, { withCredentials: true });
  }
  public editDoctor(id: any, data: any): Observable<Object> {
    const url: any = `${environment.base_url}veseeta/doctors/${id}`;
    return this.http.patch(url, data, { withCredentials: true });
  }
  public addRating(id: any, rate: any): Observable<Object> {
    const url: any = `${environment.base_url}veseeta/doctors/rate/${id}`;
    return this.http.patch(url, rate, { withCredentials: true });
  }
  public getReservations(): Observable<Object> {
    const url: any = `${environment.base_url}veseeta/users/reservations`;
    return this.http.get(url, { withCredentials: true });
  }
  public cancelReservation(data: any): Observable<Object> {
    const url: any = `${environment.base_url}veseeta/users/cancelreservations`;
    return this.http.patch(url, data, { withCredentials: true });
  }
  public reservingDoctor(data: any): Observable<Object> {
    const url: any = `${environment.base_url}veseeta/doctors/reservations`;
    return this.http.post(url, data, { withCredentials: true });
  }
  public reserveUser(data: any): Observable<Object> {
    const url: any = `${environment.base_url}veseeta/users/reservations`;
    return this.http.post(url, data, { withCredentials: true });
  }
  public cancelReservationDoctor(data: any): Observable<Object> {
    const url: any = `${environment.base_url}veseeta/doctors/cancelreservations`;
    return this.http.post(url, data, { withCredentials: true });
  }
  public uploadPhoto(data: any): Observable<Object> {
    const url: any = `${environment.base_url}veseeta/img`;
    return this.http.post(url, data, { withCredentials: true });
  }
  public getUserData(): Observable<Object> {
    const url: any = `${environment.base_url}veseeta/user`;
    return this.http.get(url, { withCredentials: true });
  }
  public getMyRole(): Observable<Object> {
    const url: any = `${environment.base_url}veseeta/role`;
    return this.http.get(url, { withCredentials: true });
  }
}
