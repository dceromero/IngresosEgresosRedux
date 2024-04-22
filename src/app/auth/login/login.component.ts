import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})

export class LoginComponent implements OnInit, OnDestroy {

  private fb: FormBuilder = inject(FormBuilder);
  private auth: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private store: Store<AppState> = inject(Store);
  private subcripcion?: Subscription;
  public cargando: boolean = false;

  public formLogin: FormGroup = this.fb.group({
    mail: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  ngOnInit(): void {
    this.subcripcion = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoad;
    })
  }

  ngOnDestroy(): void {
    this.subcripcion?.unsubscribe();
  }

  login() {
    if (this.formLogin.invalid) return;
    this.store.dispatch(ui.isLoading());

    const { mail, password } = this.formLogin.value;
    this.auth.loginUser(mail, password)
      .then(resp => {
        // Swal.close()
        this.store.dispatch(ui.stopLoading());
        this.router.navigateByUrl('/');
      })
      .catch(() => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: "error",
          title: "Error:",
          text: "Valide su usuario y password",
        });
      });
  }
}
