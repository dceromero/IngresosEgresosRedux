import { AuthService } from './auth.service';
import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  private fireStrore: AngularFirestore = inject(AngularFirestore);
  private usuario: AuthService = inject(AuthService);
  constructor() { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgresoModel) {

    delete ingresoEgreso.uid;
    return this.fireStrore.doc(`${this.usuario.getUsuario.uid}/ingresos-egresos`)
      .collection('item')
      .add({ ...ingresoEgreso });

  }

  obtenerItems(uid: string) {
    return this.fireStrore.collection(`${uid}/ingresos-egresos/item`)
      .snapshotChanges()
      .pipe(
        map(resp => resp.map(doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        })
        )
        )
      );
  }

  deleteItem(idItem: string) {
    return this.fireStrore.doc(`${this.usuario.getUsuario.uid}/ingresos-egresos/item/${idItem}`).delete();
  }

}
