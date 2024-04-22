import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ``
})

export class RegisterComponent implements OnInit, OnDestroy {

  registroForm!: FormGroup;

  private auth: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  private route: Router = inject(Router);
  private store: Store<AppState> = inject(Store);
  private subcription?: Subscription;
  public cargando: boolean = false;

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.subcription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoad);
  }

  ngOnDestroy(): void {
    this.subcription?.unsubscribe();
  }


  crearUsuario() {
    if (this.registroForm.invalid) return;
    this.store.dispatch(ui.isLoading());
    // Swal.fire({
    //   title: "por favor espere",
    //   didOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    const { nombre, correo, password } = this.registroForm.value
    this.auth.creaUsuario(nombre, correo, password)
      .then(() => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.route.navigateByUrl('/');
      })
      .catch((error) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: "error",
          title: "Error:",
          text: "el correo ya existe",
        });
      });
  }

}
