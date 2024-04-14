import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})

export class LoginComponent implements OnInit {


  formLogin!: FormGroup;
  private fb: FormBuilder = inject(FormBuilder);
  private auth: AuthService = inject(AuthService);
  private router: Router = inject(Router);



  ngOnInit(): void {
    this.formLogin = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.formLogin.invalid) return;

    Swal.fire({
      title: "por favor espere",
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const { mail, password } = this.formLogin.value;
    this.auth.loginUser(mail, password)
      .then(resp => {
        Swal.close()
        this.router.navigateByUrl('/');
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error:",
          text: "Valide su usuario y password",
        });
      });
  }
}
