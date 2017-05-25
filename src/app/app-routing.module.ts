import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent }  from './editor/editor.component';

const routes: Routes = [
  { path: '', redirectTo: 'editor/223', pathMatch: 'full' },
  { path: 'editor/:id',    component: EditorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}