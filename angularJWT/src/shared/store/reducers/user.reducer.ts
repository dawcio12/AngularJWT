import { Action, createReducer, on } from '@ngrx/store';
import userActions from '../actions/user.action'

namespace userReducerNamespace{
export type State = {};
const initialState: State = null as any;

const userReducer = createReducer(
    initialState,
    on(userActions.loadSuccess, (state, { payload }) => (payload)),
    on(userActions.logout, (state, { payload }) => (null as any)),
);

export function reducer(state=initialState, action: Action) {
    return userReducer(state, action);
}

}
export default userReducerNamespace;