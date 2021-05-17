import fromUserReducer from './user.reducer';
import { Action, ActionReducerMap } from '@ngrx/store';
import { InjectionToken } from '@angular/core';


    export function getUserState(state: State) {
        return state.userState;
    }


export interface State {
    userState: fromUserReducer.State;
    
}
export const ROOT_REDUCERS = new InjectionToken<
        ActionReducerMap<State, Action>
    >('Root reducers token', {
        factory: () => ({
            userState: fromUserReducer.reducer,
        }),
    });