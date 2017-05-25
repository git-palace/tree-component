import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ModelPanel, PanelType } from './shared/panel.model';
import { Observable } from 'rxjs/Observable';
import { NotificationService }       from './notification.service';


@Injectable()
export class DataService {

  private headers = new Headers({'Content-Type': 'application/json'});

  panels: ModelPanel[] = [];

  constructor(private http: Http, private notificationService: NotificationService) {
  }


  loadModelPanel(panelAction)
  {
        this.notificationService.onPanelChange(panelAction);
  }

  displayPanel(panelAction)
  {

      var modelPanel: ModelPanel = { 
          title: "string",
          panelType: panelAction.panelType,
          model: null
      };

      if(panelAction.display == 'replace')
      {
          this.panels = [];
      }

      this.panels.push(modelPanel);

  }


}