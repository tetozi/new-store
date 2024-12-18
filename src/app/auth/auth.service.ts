import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription, tap,} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { User } from '../Interface/userr,model';

const {apiUrl} = environment
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  /*
  private user$$ = new BehaviorSubject< User| undefined>(undefined);
  public user$ = this.user$$.asObservable();
  private 
*/
private user$$ = new BehaviorSubject<User | undefined>(undefined);
public user$ = this.user$$.asObservable();
user: User | undefined;

subscription : Subscription

  constructor(private http: HttpClient) {
     this.subscription = this.user$.subscribe((user) => {
      this.user = user
     })
  }
 // Save user in Behavior Subject
 login(email: string, password: string): Observable<any> {
  return this.http.post(`${apiUrl}/api/user/login`, { email, password },{ withCredentials: true }).pipe(
    tap((response: any) => {
      if (response.status === "Success" && response.data) {
        const { user, token } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.user$$.next(user);
      } else {
        throw new Error('Invalid response format');
      }
    })
  );
}

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/api/user/register`, userData).pipe(
      tap(response => {
        localStorage.setItem('token', response.data.token);  
        localStorage.setItem('user', JSON.stringify(response.data.user));  
        this.user$$.next(response.data.user);  
      })
    );
  }

 // 
  isLoggedIn() {
    return this.http.get(`${apiUrl}/api/user/isLoggedIn`,{ withCredentials: true }).pipe(
      map((response: any) => {
        console.log(response)
        if (response?.status === 'success' && response?.data?.user) {
          this.user$$.next(response.data.user);
          return true;
        } else {
          this.user$$.next(undefined);
          return false;
        }
      })
    );
  }
  //Return is logged in 
  isAuthenticated(): boolean {
    return !!this.user
  }
 //Return role
  hasRole(roles: string[]): boolean {
    const user = this.getUser();
    return user && roles.includes(user.role);
  }
// Return value from BehaviorSubject
  getUser(): any {
    return this.user$$.getValue();  
  }
  //clear all value
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user$$.next(undefined);
  }

 ngOnDestroy(): void {
   this.subscription.unsubscribe()
 }
}
  
  