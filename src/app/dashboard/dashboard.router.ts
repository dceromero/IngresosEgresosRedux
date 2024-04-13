import { Routes } from "@angular/router";
import { EstadisticaComponent } from "../ingreso-egreso/estadistica/estadistica.component";
import { IngresoEgresosComponent } from "../ingreso-egreso/ingresos-egresos.component";
import { DetalleComponent } from "../ingreso-egreso/detalle/detalle.component";

export const dashBoardRouters: Routes =[
    {
        path:'',
        component:EstadisticaComponent
    },
    {
        path:'ingresos-egresos',
        component:IngresoEgresosComponent
    },
    {
        path:'detalle',
        component:DetalleComponent
    }
];


