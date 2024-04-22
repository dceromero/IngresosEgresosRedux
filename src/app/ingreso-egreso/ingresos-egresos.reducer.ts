import { createReducer, on } from '@ngrx/store';
import * as actions from './ingresos-egresos.action';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';
import { state } from '@angular/animations';

export interface State {
    items: IngresoEgresoModel[];
}

export const initialState: State = {
    items: [],
}

export const ingresosEgresosReducer = createReducer(initialState,

    on(actions.setItems , (state, {items}) => setItems(state, items )),
    on(actions.unSetItems, state => unSetItems(state))


);


function unSetItems(state: State) {
    return ({...state, items: []});
}

function setItems(state: State, items:IngresoEgresoModel[]) {    
    return ({...state, items: [...items]});
}