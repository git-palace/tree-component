import { Injectable, EventEmitter }    from '@angular/core';
//import { ModelPanel }    from './shared/panel.model';

@Injectable()
export class NotificationService {

  public emitterTapOnIcon$: EventEmitter<string>;
  public emitterPanelChange$: EventEmitter<any>;
  public emitterRowslChange$: EventEmitter<any>;

  constructor() { 

    this.emitterTapOnIcon$ = new EventEmitter();
    this.emitterPanelChange$ = new EventEmitter();
    this.emitterRowslChange$ = new EventEmitter();

  }


  onIconTap(panelType:string)
  {
    this.emitterTapOnIcon$.emit(panelType);
  }

  onPanelChange(panelAction)
  {
    this.emitterPanelChange$.emit(panelAction);
  }


  onRowsChange(rows)
  {
    this.emitterRowslChange$.emit(rows);
  }

}