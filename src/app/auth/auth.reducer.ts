import { UsuarioModel } from './../models/usuario.model';
import { createReducer, on } from '@ngrx/store';
import * as actions from './auth.actions';

export interface State {
    user: UsuarioModel;
}

export const initialState: State = {
    user: { mail: '', nombre: '', uid: '' },
}

export const authReducer = createReducer(initialState,

    on(actions.setUser, (state, { user }) => setUser(state, user)),

    on(actions.unSetUser, (state) => unSetUser(state))

);


function setUser(state: State, user: UsuarioModel) {
    return { ...state, user }
}

function unSetUser(state: State) {
    return { ...state, user: { mail: '', nombre: '', uid: '' } }
}