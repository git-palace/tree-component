// Angular
import { NgModule }               from '@angular/core';
import { BrowserModule }          from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }            from '@angular/forms';
import { HttpModule }             from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'rxjs/add/operator/map'

// Routing
import { AppRoutingModule }       from './app-routing.module';

// Main
import { AppComponent }           from './app.component';

// Website Structure
import { EditorNavBarComponent }  from './editor-nav-bar/editor-nav-bar.component';


// Editor
import { EditorComponent }       from './editor/editor.component';
import { PanelTreeComponent } from './panels/panel-tree/panel-tree.component';
import { PanelComponent }  from './panels/panel/panel.component';
import { ValueRowComponent } from './panels/value-row/value-row.component';


import { DataService }            from './data.service';
import { NotificationService }       from './notification.service';


// Pipes
import { MapToArrayPipe } from './shared/pipes';


import {DragAndDropModule} from 'angular-draggable-droppable';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    DragAndDropModule.forRoot(),
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
    //AppRoutingModule
  ],
  declarations: [
    AppComponent,
    EditorNavBarComponent,
    EditorComponent,
    PanelTreeComponent,
    MapToArrayPipe,
    PanelComponent,
    ValueRowComponent,
  ],
  providers: [ DataService, NotificationService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }