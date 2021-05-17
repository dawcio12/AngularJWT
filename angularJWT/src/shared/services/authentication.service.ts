import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User } from '../models';
import { Store } from '@ngrx/store';
import { getUserState, State } from '../../shared/store/reducers';
import UserActionNamespace from '../store/actions/user.action';
import { ErrorHandlerService } from './error.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    subscription: Subscription = new Subscription();
    constructor(private errorService: ErrorHandlerService, private store: Store<State>,) {

        this.currentUserSubject = new BehaviorSubject<User>(null as any);
        this.currentUser = this.currentUserSubject.asObservable();
        this.subscription.add(this.store.select(getUserState).subscribe(
            res => {
                if(res)
                this.currentUserSubject.next(res);
            }));
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        this.errorService.setcurrentErrorValue = "";
        this.store.dispatch(UserActionNamespace.loadReaquest({ payload: { username: username, password: password } }));
    }

    logout() {
        this.store.dispatch(UserActionNamespace.logout({ payload: {} }));
        this.currentUserSubject.next(null as any);
    }
}