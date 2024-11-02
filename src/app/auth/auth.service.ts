import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap,} from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /*
  private user$$ = new BehaviorSubject< User| undefined>(undefined);
  public user$ = this.user$$.asObservable();
  private user: User | undefined;
*/
private user$ = new BehaviorSubject<any>(null);
public user = this.user$.asObservable();


  constructor(private http: HttpClient) {
     this.user.subscribe(user => console.log(user))
  }
 // Save user in Behavior Subject
  login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://localhost:4242/api/user/login', { email, password })
        .subscribe(
          (response: any) => {
            localStorage.setItem('token', response.data.token);
            this.user$.next( response.data.user)
            console.log(response.data.user)
            resolve(this.user$);
          },
          (error) => {
            reject(error);
          }
        );
    })
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>('http://localhost:4242/api/user/register', userData).pipe(
      tap(response => {
        localStorage.setItem('token', response.data.token);  
        localStorage.setItem('user', JSON.stringify(response.data.user));  
        this.user$.next(response.data.user);  
      })
    );
  }
  //Return is logged in 
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
 //Return role
  hasRole(roles: string[]): boolean {
    const user = this.getUser();
    return user && roles.includes(user.role);
  }
// Return value from BehaviorSubject
  getUser(): any {
    return this.user$.getValue();  
  }
  //clear all value
  logout() {
   
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user$.next(null);
  }
}
  
  