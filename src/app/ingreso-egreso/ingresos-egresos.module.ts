import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';



@NgModule({
  declarations: [
    DetalleComponent, 
    EstadisticaComponent],
  imports: [
    CommonModule
  ], exports: [
    DetalleComponent, 
    EstadisticaComponent
  ]
})
export class IngresosEgresosModule { }
