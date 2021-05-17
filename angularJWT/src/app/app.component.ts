import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../shared/services';
import { User } from '../shared/models';
import { getUserState, State } from 'src/shared/store/reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    currentUser: User = new User;
    subscription: Subscription = new Subscription();
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private store: Store<State>,
    ) {
      this.subscription.add(this.store.select(getUserState).subscribe(
        res => {
            this.currentUser = res
        }));

    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}