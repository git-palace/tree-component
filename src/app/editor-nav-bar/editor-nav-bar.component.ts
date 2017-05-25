import { Component, OnInit } from '@angular/core';
import { PanelType } from '../shared/panel.model';
import { DataService }       from '../data.service';


@Component({
  selector: 'app-editor-nav-bar',
  templateUrl: './editor-nav-bar.component.html',
  styleUrls: ['./editor-nav-bar.component.css']
})
export class EditorNavBarComponent implements OnInit {

  constructor(private dataService: DataService) { }

  PanelType = PanelType;

  ngOnInit() {
  }

  // onIconTap(panelType: number) {
  //   console.log('onIconTap : ' + panelType);
  //   this.dataService.zoadModelPanel(panelType);
  // }
  

}
