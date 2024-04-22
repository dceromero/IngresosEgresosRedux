import { NgModule } from '@angular/core';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IngresoEgresosComponent } from './ingresos-egresos.component';
import { SortIngresoEgresoPipe } from '../pipes/sort-ingreso-egreso.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardRouterModule } from '../dashboard/dashboard.router.module.ts.module';
import { CommonModule } from '@angular/common';
import { ingresosEgresosReducer } from './ingresos-egresos.reducer';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [
    IngresoEgresosComponent,
    DetalleComponent, 
    EstadisticaComponent,    
    DashboardComponent,    
    SortIngresoEgresoPipe
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    ReactiveFormsModule,
    RouterModule,
    DashboardRouterModule,
    SharedModule,
    StoreModule.forFeature('ingresosEgresos',ingresosEgresosReducer),
  ], exports: [
    DetalleComponent,     
    DashboardComponent,   
    EstadisticaComponent
  ]
})
export class IngresosEgresosModule { 

  
}
