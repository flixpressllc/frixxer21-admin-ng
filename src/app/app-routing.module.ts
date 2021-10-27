import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from '../app/guards/auth.guard';
import { BlockDefsComponent } from './pages/block-defs/block-defs.component';
import { CreateBlockDefComponent } from './pages/create-block-def/create-block-def.component';
import { UpdateBlockDefComponent } from './pages/update-block-def/update-block-def.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'blockdefs', component: BlockDefsComponent, canActivate: [AuthGuard] },
  { path: 'blockdef/new', component: CreateBlockDefComponent, canActivate: [AuthGuard] },
  { path: 'blockdef/:id', component: UpdateBlockDefComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
