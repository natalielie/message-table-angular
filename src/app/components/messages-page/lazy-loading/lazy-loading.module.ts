import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesPageComponent } from '../messages-page.component';
import { messagesPath } from '../../../shared/globals';

const routes: Routes = [
  { path: messagesPath, component: MessagesPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LazyLoadingModule {}
