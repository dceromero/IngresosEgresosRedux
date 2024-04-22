import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as uiActions from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingresos-egresos.component.html',
  styles: ``
})
export class IngresoEgresosComponent implements OnInit, OnDestroy {



  private fb: FormBuilder = inject(FormBuilder);
  private service: IngresoEgresoService = inject(IngresoEgresoService);
  private store: Store<AppState> = inject(Store);
  private subcripcion!: Subscription;

  public tipo: string = 'Ingreso';
  public loading: boolean = false;
  public formIngresoEgreso: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    monto: ['', Validators.required]
  })

  ngOnInit(): void {
    this.subcripcion = this.store.select('ui').subscribe(state => this.loading = state.isLoad);
  }

  ngOnDestroy(): void {
    this.subcripcion.unsubscribe();
  }
  guardar() {

    this.store.dispatch(uiActions.isLoading());
    if (this.formIngresoEgreso.invalid) return;

    const { descripcion, monto } = this.formIngresoEgreso.value;
    const ingresoEgreso = new IngresoEgresoModel(descripcion, monto, this.tipo);
    this.service.crearIngresoEgreso(ingresoEgreso).then(resp => {
      this.formIngresoEgreso.reset();
      this.store.dispatch(uiActions.stopLoading());
      Swal.fire('Registro creado', descripcion, 'success');
    }).catch(err =>{ 
      this.store.dispatch(uiActions.stopLoading());
      console.error(err)
    });
  }
}
