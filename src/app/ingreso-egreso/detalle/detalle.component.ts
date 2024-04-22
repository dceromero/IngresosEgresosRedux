import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { IngresoEgresoModel } from '../../models/ingreso-egreso.model';
import { AppStateWithIngresosEgresos } from '../ingresos-egresos.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: ``
})

export class DetalleComponent implements OnInit, OnDestroy {

  private store: Store<AppStateWithIngresosEgresos> = inject(Store);
  private service:IngresoEgresoService = inject(IngresoEgresoService);
  private subs!: Subscription;

  public items:IngresoEgresoModel[]= []

  ngOnInit(): void {
    this.subs = this.store.select('ingresosEgresos').subscribe(({ items }) => this.items = items)
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  deleteItem(uid:string){
    this.service.deleteItem(uid)
    .then(()=>  Swal.fire('Registro Eliminado', 'El registro ha sido eliminado', 'success'))
    .catch(err=> Swal.fire('Error: ', `Error: ${err.message} `, 'error'))
  }
}
