import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService, ErrorHandlerService} from '../../shared/services';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {getUserState, State} from '../../shared/store/reducers';
@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    subscription: Subscription = new Subscription();
    loginForm: FormGroup=new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });;
    loading = false;
    submitted = false;
    returnUrl: string='';
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private errorService: ErrorHandlerService,
        private store: Store<State>,
    ) { 
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
      

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.subscription.add(this.store.select(getUserState).subscribe(
            res => {
                if(res)
                this.router.navigate([this.returnUrl]);
            }));
            this.subscription.add(this.errorService.currentErrorValue().subscribe(res=>{
               
                this.loading = false;
                this.error=res}))

    }
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)

    }
}
