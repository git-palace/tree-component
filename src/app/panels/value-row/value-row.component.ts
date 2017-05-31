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

  isExpand: any = 1;

  isReplace: any = 0;

  constructor(private dataService: DataService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.isActive = false;
  }

  onDrop(event, child = true) {
    const dragged_id = event['dropData'];

    if (dragged_id != this.model.model_id) {
      // this.notificationService.onRowsChange({ a: dragged_id, b: this.model.model_id });
      if (child) {
        this.dataService.move_node(dragged_id, this.model.model_id)
      } else {
        this.dataService.move_to_before(dragged_id, this.model.model_id)
      }
    } else if (this.isReplace == 1) {
      let parent_node = this.dataService.get_parent_node_from_child_id(this.model.parent_id)
      parent_node = this.dataService.get_parent_node_from_child_id(parent_node.parent_id)
      
      if (parent_node) {
        this.dataService.move_node(this.model.model_id, parent_node.model_id)
      } else {
        this.dataService.move_to_root_tree(this.model.model_id)
      }
      this.isReplace = 0
    }
  }

  onDragEnter(event) {
    const dragged_id = event['dropData'];

    if (dragged_id != this.model.model_id) {
      this.isReplace = 0
      // this.notificationService.onRowsChange({ a: dragged_id, b: this.model.model_id });
      // this.dataService.move_node(event['dropData'], this.model.model_id)
    } else {
      if (this.model == this.dataService.get_last_child_node(this.model.parent_id))
        this.isReplace = 1 - this.isReplace
    }

  }

  onDragLeave(event) {
    this.isReplace = 0
  }

  onDragOver(event) {
    const dragged_id = event['dropData'];
    if (dragged_id != this.model.model_id) {
    } else {
    }
  }

  onMouseDown(event) {
    event.stopPropagation()
    this.isActive = true;
  }

  onMouseUp(event) {
    this.isActive = false;
  }

  removeNode() {
    this.dataService.remove_node_from_nodes(this.model.model_id, this.dataService.get_all_nodes())
  }

  addNewNode() {
    let new_node = {
      'base_class_id': this.model.base_class_id,
      'children_id': Math.floor(Math.random() * 1000) + '',
      'class_id': this.model.class_id,
      'class_name': this.model.class_name,
      'data_hint': 'Object',
      'data_type': 'Object',
      'date_created': '',
      'date_modified': '',
      'icon': 'icon_layer.gif',
      'is_system': '1',
      'model_id': Math.floor(Math.random() * 1000) + '',
      'parent_id': this.model.children_id,
      'nodes': []
    }

    this.dataService.add_new_node(this.model.model_id, new_node, this.dataService.get_all_nodes())
  }

  onToggle() {
    this.isExpand = 1 - this.isExpand
  }

  expand() {
    this.isExpand = 1
  }

  collapse() {
    this.isExpand = 0
  }
}
