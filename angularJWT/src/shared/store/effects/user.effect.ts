import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import userActionNamespace from '../actions/user.action';
import { UserService } from 'src/shared/services/user.service';
import { ErrorHandlerService } from 'src/shared/services';


@Injectable()
export class UserEffects {
    constructor(private actions$: Actions,
        private userService: UserService,
        private errorHandler: ErrorHandlerService
        ) { }

    loadUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActionNamespace.loadReaquest),
        switchMap(({ payload }) => this.userService.authenticateUser(payload)
            .pipe(
                map(res => userActionNamespace.loadSuccess({ payload: res })),
                catchError(error => { this.errorHandler.handleError(error);
                    return of(userActionNamespace.loadError())
                }
                )
            )
        )
    )
    );
}