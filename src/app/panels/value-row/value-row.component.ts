import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../data.service';
import { NotificationService } from '../../notification.service';

declare var EditorManager: any;

@Component({
  selector: 'app-value-row',
  templateUrl: './value-row.component.html',
  styleUrls: ['./value-row.component.css']
})
export class ValueRowComponent implements OnInit {

  @Input() model: any;
  @Input() level: number;

  isActive: boolean = false;

  constructor(private dataService: DataService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.isActive = false;
  }

  onDrop(event) {
    const dragged_id = event['dropData'];

    if (dragged_id != this.model.model_id) {
      // this.notificationService.onRowsChange({ a: dragged_id, b: this.model.model_id });
      this.dataService.move_node(event['dropData'], this.model.model_id)
    }
  }

  onDragEnter(event) {
    const dragged_id = event['dropData'];

    if (dragged_id != this.model.model_id) {
      // this.notificationService.onRowsChange({ a: dragged_id, b: this.model.model_id });
      // this.dataService.move_node(event['dropData'], this.model.model_id)
    }

  }

  onDragLeave(event) {
  }

  onDragOver(event) {
  }

  onMouseDown(event) {
    event.stopPropagation()
    this.isActive = true;
  }

  onMouseUp(event) {
    this.isActive = false;
  }

}
