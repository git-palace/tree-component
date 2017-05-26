import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PanelType } from '../../shared/panel.model';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ValueRowComponent } from '../value-row/value-row.component'
import { NotificationService } from '../../notification.service';
import { DataService } from '../../data.service'

@Component({
  selector: 'app-panel-tree',
  templateUrl: './panel-tree.component.html',
  styleUrls: ['./panel-tree.component.css'],

  animations: [
    trigger('slideIn', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({
          opacity: 1,
          transform: 'translateX(-10%)'
        }),
        animate('0.1s ease-out')
      ])
    ]),

    trigger('fadeIn', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
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

  @Input() panel: any;

  modelTree: any;

  PanelType = PanelType;

  private emitterOnSwitch: any;

  constructor(private dataService: DataService, private notificationService: NotificationService) { }

  ngOnInit() {

    this.modelTree = this.dataService.get_model_tree();

    this.emitterOnSwitch = this.notificationService.emitterRowslChange$.subscribe(rows => {
      console.log('a ' + rows.a);
      console.log('b ' + rows.b);
    });
  }

  ngOnDestroy() {
    this.emitterOnSwitch.unsubscribe();
  }
}