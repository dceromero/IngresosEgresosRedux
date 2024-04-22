import { Store } from '@ngrx/store';
import { AppState } from './../app.reducer';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as actionsItem from '../ingreso-egreso/ingresos-egresos.action';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit, OnDestroy {


  private store: Store<AppState> = inject(Store);
  private service: IngresoEgresoService = inject(IngresoEgresoService);
  private userSubs!: Subscription;
  private ingresoEgresoSubs!: Subscription;

  ngOnInit(): void {
    this.userSubs = this.store.select('auth')
      .pipe(
        filter(auth => auth.user.uid != '')
      )
      .subscribe(resp => {
       this.ingresoEgresoSubs = this.service.obtenerItems(resp.user.uid)
          .subscribe((itemsFB: IngresoEgresoModel[]) => {
            this.store.dispatch(actionsItem.setItems({ items: itemsFB }));
          });
      })
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
    this.ingresoEgresoSubs.unsubscribe();
  }



}
