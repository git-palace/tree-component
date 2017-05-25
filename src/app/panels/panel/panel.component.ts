import { Component, OnInit, Input } from '@angular/core';

import { ModelPanel, PanelType } from '../../shared/panel.model';
import { PanelTreeComponent } from '../panel-tree/panel-tree.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})

export class PanelComponent implements OnInit {

  public PanelType = PanelType;

  @Input() panel: ModelPanel;

  constructor() { }

  ngOnInit() {

  }
}
