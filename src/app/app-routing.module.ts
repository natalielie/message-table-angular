import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Pathes } from './shared/globals';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: Pathes.root, redirectTo: Pathes.homePath, pathMatch: 'full' },
  {
    path: Pathes.homePath,
    component: HomeComponent,
  },
  {
    path: Pathes.root,
    loadChildren: () =>
      import('./messages-page-lazy-loading/messages.module').then(
        (m) => m.LazyLoadingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
