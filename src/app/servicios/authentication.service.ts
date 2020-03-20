import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario } from '../modelos';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

 private currentUserSubject: BehaviorSubject<Usuario>;
 public currentUser: Observable<Usuario>;

 constructor(private http: HttpClient) { 
   this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('cxpUser')));
   this.currentUser        = this.currentUserSubject.asObservable();
 }

 public get currentUserValue(): Usuario {
   return this.currentUserSubject.value;
 }

 Login(username:string, password:string,empresa:string) {
   
      return this.http.post<any>("https://wssia.translamex.com/cxpservice/api/Login",{"usuario":username,"clave":password,"empresa":empresa})
       .pipe(map(user => {
         localStorage.setItem('cxpUser', JSON.stringify(user));
         this.currentUserSubject.next(user);
         return user;
       }));
  }

 Logout() {
   // remove user from local storage and set current user to null
   localStorage.removeItem('cxpUser');
   this.currentUserSubject.next(null);
 }

}
