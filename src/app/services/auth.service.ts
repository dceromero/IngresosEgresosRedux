import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription, map } from 'rxjs';
import { UsuarioModel } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import * as actionsUser from '../auth/auth.actions';
import { AppState } from '../app.reducer';
import * as actionsItems from '../ingreso-egreso/ingresos-egresos.action';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subcription!: Subscription;
  private auth: AngularFireAuth = inject(AngularFireAuth);
  private fireStrore: AngularFirestore = inject(AngularFirestore);
  private store: Store<AppState> = inject(Store);

  private _usuario: UsuarioModel = { mail: '', nombre: '', uid: '' };

  get getUsuario(){
    return this._usuario;
  }
  
  initAuthListener() {
    this.auth.authState.subscribe(fUser => {
      // si el usuario está logueado, se suscribe al usuario en la base de datos
      // y actualiza el usuario en el estado y en el store
      if (fUser) {
        this.subcription = this.fireStrore.doc(`${fUser?.uid}/usuario`).valueChanges()
          .subscribe(fbUser => {
            const user = UsuarioModel.fromFirebase(JSON.stringify(fbUser));
            this._usuario = user;
            this.store.dispatch(actionsUser.setUser({ user }));
          });
      } else {
        // si el usuario ha cerrado sesion, se elimina el usuario en el estado
        // y en el store, y se desuscribe al usuario en la base de datos
        if (this.subcription) this.subcription.unsubscribe();
        this._usuario = { mail: '', nombre: '', uid: '' };
        this.store.dispatch(actionsUser.unSetUser());
        this.store.dispatch(actionsItems.unSetItems());
      }

    });
  }

  creaUsuario(nombre: string, mail: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(mail, password)
      .then(({ user }) => {
        const newUser = new UsuarioModel(user!.uid, nombre, mail);
        return this.fireStrore.doc(`${user!.uid}/usuario`).set({ ...newUser });
      });
  }

  loginUser(mail: string, psw: string) {
    return this.auth.signInWithEmailAndPassword(mail, psw);
  }

  logout() {
    return this.auth.signOut();
  }

  isOuth() {
    return this.auth.authState.pipe(
      map(fUser => fUser != null)
    );
  }

  
}
