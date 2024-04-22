import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IngresoEgresosComponent } from './ingresos-egresos.component';
import { SortIngresoEgresoPipe } from '../pipes/sort-ingreso-egreso.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    IngresoEgresosComponent,
    DetalleComponent, 
    EstadisticaComponent,    
    SortIngresoEgresoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ], exports: [
    DetalleComponent, 
    EstadisticaComponent
  ]
})
export class IngresosEgresosModule { 

  
}
