import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';
import { UsuarioModel } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: AngularFireAuth = inject(AngularFireAuth);
  private fireStrore: AngularFirestore = inject(AngularFirestore);

  initAuthListener() {
    this.auth.authState.subscribe(fUser => {
      console.log(fUser);
      console.log(fUser?.uid);
      console.log(fUser?.email);
    })
  }

  creaUsuario(nombre: string, mail: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(mail, password)
      .then(({ user }) => {
        const newUser = new UsuarioModel(user!.uid, nombre, mail);
        return this.fireStrore.doc(`${user!.uid}/usuario`).set({...newUser});
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
