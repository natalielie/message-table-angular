import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { homePath } from './shared/globals';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: homePath, pathMatch: 'full' },
  {
    path: homePath,
    component: HomeComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import(
        './messages-page-lazy-loading/messages-page-lazy-loading.module'
      ).then((m) => m.LazyLoadingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
