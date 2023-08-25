import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/security-guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'user', component: UserComponent , canActivate: [AuthGuard], data: { roles: ['USER']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
