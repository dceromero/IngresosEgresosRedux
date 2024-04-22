import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashBoardRouters } from './dashboard.router';
//import { authGuard } from '../services/auth.guard';

export const rutasHijas: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashBoardRouters,
    //canActivate: [authGuard]
  },
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutasHijas)
  ],
  exports: [RouterModule]
})
export class DashboardRouterModule { }
