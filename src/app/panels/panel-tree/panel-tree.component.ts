import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PanelType, SAMPLETREE } from '../../shared/panel.model';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { ValueRowComponent } from '../value-row/value-row.component'
import { NotificationService } from '../../notification.service';



@Component({
  selector: 'app-panel-tree',
  templateUrl: './panel-tree.component.html',
  styleUrls: ['./panel-tree.component.css'],

animations: [
  trigger('slideIn', [
    state('in', style({opacity: 1, transform: 'translateX(0)'})),
    transition('void => *', [
      style({
        opacity: 1,
        transform: 'translateX(-10%)'
      }),
      animate('0.1s ease-out')
    ])
  ]),

    trigger('fadeIn', [
    state('in', style({opacity: 1, transform: 'translateX(0)'})),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateX(-10%)'
      }),
      animate('0.1s ease-out')
    ])
  ]),

]

})
export class PanelTreeComponent implements OnInit, OnDestroy {

  @Input() panel:any;

  modelTree:any;

  PanelType = PanelType;

  private emitterOnSwitch: any;


  constructor(private notificationService: NotificationService) {}

  ngOnInit() {


    this.panel.model = SAMPLETREE;

    var temp = JSON.parse(JSON.stringify(SAMPLETREE));
    this.convertToTree(temp);

    this.modelTree = temp;

    this.emitterOnSwitch = this.notificationService.emitterRowslChange$.subscribe(rows => 
    {
      console.log('a ' + rows.a);
      console.log('b ' + rows.b);
    });


  }


    ngOnDestroy()
    {
      this.emitterOnSwitch.unsubscribe();
    }




    convertToTree(model): void
    {
        var obj = {};
        obj['model'] = model;
        this._convertToTree(obj['model']);
    }

    _convertToTree(model): void
    {
        if (model.hasOwnProperty('elements'))
        {
            // internal stuff
            delete model['elements']['7']; 
            delete model['elements']['36']; 

            model['nodes'] = Array.from(model['elements']['8']['elements']);

            model['children_id'] = model['elements']['8']['model_id'];
            
            for (var itr in model['nodes'])
            {
                var val = model['nodes'][itr];
                this._convertToTree(val);
            }

            delete model['elements'];
        }
        else
        {
            model['nodes'] = [];
        }
    }

}