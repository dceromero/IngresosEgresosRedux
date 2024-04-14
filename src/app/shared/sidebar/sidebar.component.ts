import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {

  private auth:AuthService = inject(AuthService);
  private route:Router = inject(Router);  

  logout() {
    this.auth.logout()
    .then(()=> this.route.navigateByUrl('/login'));
  }

}
