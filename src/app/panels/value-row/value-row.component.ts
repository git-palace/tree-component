import { Component, OnInit, Input } from '@angular/core';
import { DataService }       from '../../data.service';
import { NotificationService } from '../../notification.service';

declare var EditorManager: any;

@Component({
  selector: 'app-value-row',
  templateUrl: './value-row.component.html',
  styleUrls: ['./value-row.component.css']
})
export class ValueRowComponent implements OnInit {

  @Input() model:any;
  @Input() level:number;

  isActive:boolean = false;

  constructor(private dataService:DataService, private notificationService:NotificationService) { }

  ngOnInit() {
    this.isActive = false;
  }


  onDrop(event)
  {
    //console.log('onDrop');
    //console.log(event);
  }


  onDragEnter(event)
  {
    //console.log('onDragEnter');
    const dragged_id = event['dropData'];
    //console.log(event);
    //console.log(event);

    if (dragged_id != this.model.model_id)
    {
       //console.log(dragged_id + ' switch with ' + this.model.model_id;

       //console.log(node1);
       //console.log(node2);

       this.notificationService.onRowsChange({a: dragged_id, b: this.model.model_id});

    }

  }

  onDragLeave(event)
  {
    //console.log('onDragLeave');
    //console.log(event);
  }
  
  onDragOver(event)
  {
    //console.log('onDragOver');
    //console.log(event);
  }


  onMouseDown(event)
  {
    console.log('onMouseDown');
    //this.model['isActive'] = true;

    this.isActive = true;
  }

  onMouseUp(event)
  {
    //console.log('onMouseUp');
    //this.model['isActive'] = false;

    this.isActive = false;
  }

}
