import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgresoModel } from '../../models/ingreso-egreso.model';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { AppStateWithIngresosEgresos } from '../ingresos-egresos.reducer';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: ``
})
export class EstadisticaComponent implements OnInit, OnDestroy {


  private store: Store<AppStateWithIngresosEgresos> = inject(Store);
  private subcription?: Subscription;

  colorScheme:Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;

  data: { name: string, value: number }[]=[];
  ngOnInit(): void {
    this.subcription = this.store.select('ingresosEgresos').subscribe(({ items }) => {
      this.generarEstaistica(items);
      this.data = [{
        name: 'Ingresos',
        value: this.totalIngresos
      }, {
        name: 'Egresos',
        value: this.totalEgresos
      }];
    })
  }
  ngOnDestroy(): void {
    this.subcription?.unsubscribe();
  }

  generarEstaistica(items: IngresoEgresoModel[]) {
    this.totalEgresos =0;
    this.totalIngresos =0;
    for (const item of items) {
      if (item.tipo === 'Ingreso') {
        this.ingresos++;
        this.totalIngresos += item.monto;
      } else {
        this.egresos++;
        this.totalEgresos += item.monto;
      }
    }
    
  }




}
