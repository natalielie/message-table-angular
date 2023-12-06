import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MessagesPageComponent } from './component/messages-page/messages.component';
import { Pathes } from '../shared/globals';

const routes: Routes = [
  { path: Pathes.messagesPath, component: MessagesPageComponent },
];

/**
 * a module for a lazy loading
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LazyLoadingModule {}
