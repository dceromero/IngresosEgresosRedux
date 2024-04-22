import { createAction, props } from '@ngrx/store';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';

export const setItems = createAction('[Ingreso-Egreso] setItems', props<{items:IngresoEgresoModel[]}>());
export const unSetItems = createAction('[Ingreso-Egreso] unSetItems');