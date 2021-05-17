import { createAction, props } from "@ngrx/store";
import { User } from "src/shared/models";

namespace UserActionNamespace {

    export const loadReaquest = createAction("[USER] User", props<{ payload: User }>());
    export const loadSuccess = createAction("[USER SUCCESS] User Success", props<{payload: User}>());
    export const logout = createAction("[USER logout] User logout", props<{payload: any}>());
    export const loadError = createAction("[USER AUTH ERROR] User AUTH Error");
}
export default UserActionNamespace;