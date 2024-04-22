import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent implements OnInit {


  private auth: AuthService = inject(AuthService);
  private route: Router = inject(Router);
  private store: Store<AppState> = inject(Store);

  public name:string ='';

  ngOnInit(): void {
    this.store.select('auth').subscribe(({user})=> this.name = user.nombre);
  }

  logout() {
    this.auth.logout()
      .then(() => this.route.navigateByUrl('/login'));
  }

}
