import { createReducer, on } from '@ngrx/store';
import * as actions from './ui.actions';

export interface State {
    isLoad: boolean;
}

export const initialState: State = {
    isLoad: false,
}

export const uiReducer = createReducer(initialState,

    on(actions.isLoading, state => isLoading(state)),
    on(actions.stopLoading, state => stopLoading(state))

);


function isLoading(state: State) {
    return { ...state, isLoad: true }
}
function stopLoading(state: State) {
    return { ...state, isLoad: false }
}
