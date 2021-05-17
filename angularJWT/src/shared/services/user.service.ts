import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    authenticateUser(user:User) {
        const username = user.username;
        const password = user.password;
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password });
    }
    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }
}