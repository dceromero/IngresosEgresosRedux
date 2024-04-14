import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ``
})

export class RegisterComponent implements OnInit {

  registroForm!: FormGroup;

  private auth: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  private route: Router = inject(Router);

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  crearUsuario() {
    if (this.registroForm.invalid) return;
    Swal.fire({
      title: "por favor espere",
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const { nombre, correo, password } = this.registroForm.value
    this.auth.creaUsuario(nombre, correo, password)
      .then(() => {
        Swal.close();
        this.route.navigateByUrl('/');
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error:",
          text: "el correo ya existe",
        });
      });
  }

}
