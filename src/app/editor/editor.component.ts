import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';

import { NotificationService } from '../notification.service';
import { PanelComponent } from '../panels/panel/panel.component';

import { ActivatedRoute } from '@angular/router';
import { ModelPanel, PanelType } from '../shared/panel.model';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {

  panels: ModelPanel[] = [];
  
  private emitterPanelChange: any;

  constructor(private dataService: DataService, private route: ActivatedRoute, private notificationService: NotificationService) {}

    ngOnInit()
    {
      
      this.emitterPanelChange = this.notificationService.emitterPanelChange$.subscribe(panelAction => 
      {
        this.dataService.displayPanel(panelAction);
      });

    }







}