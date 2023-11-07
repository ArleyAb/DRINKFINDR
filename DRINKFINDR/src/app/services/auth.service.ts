import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) { 
    this.userStatus$ = new Subject();
  }

  login({email, password}: any){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Observable that save the user status value
  private userStatus$:Subject<boolean>;

  // Function to update the user status
  private updateUserStatus() {
    this.auth.onAuthStateChanged((status) => {
      if (status) 
        this.userStatus$.next(true);
      else
        this.userStatus$.next(false);
    });
  }

  // Function to return the user status
  getUserStatus$(){
    this.updateUserStatus();
    return this.userStatus$.asObservable();
  }

  logout(){
    return signOut(this.auth);
  }

  register({email, password}: any){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  getUserEmail(){
    return this.auth.currentUser?.email;
  }
}
