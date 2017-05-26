import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ModelPanel, PanelType } from './shared/panel.model';
import { Observable } from 'rxjs/Observable';
import { NotificationService }       from './notification.service';
import { SAMPLETREE } from './shared/panel.model';

@Injectable()
export class DataService {

  private headers = new Headers({'Content-Type': 'application/json'});

  private all_nodes = JSON.parse(JSON.stringify(SAMPLETREE));

  private remove_node: any;

  panels: ModelPanel[] = [];

  constructor(private http: Http, private notificationService: NotificationService) {
      this._convertToTreeStructure(this.all_nodes);
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

  _convertToTreeStructure(model): void {
    if (model.hasOwnProperty('elements')) {
      // internal stuff
      delete model['elements']['7'];
      delete model['elements']['36'];

      model['nodes'] = Array.from(model['elements']['8']['elements']);

      model['children_id'] = model['elements']['8']['model_id'];

      for (var itr in model['nodes']) {
        var val = model['nodes'][itr];
        this._convertToTreeStructure(val);
      }

      delete model['elements'];
    }
    else {
      model['nodes'] = [];
    }
  }

  get_model_tree() {
    return this.all_nodes
  }

  get_all_nodes() {
      return this.all_nodes.nodes
  }

  remove_node_from_nodes(id, node_arr) {
    for (let node of node_arr) {
        if (node['model_id'] == id){
            this.remove_node = node_arr.splice(node_arr.indexOf(node), 1)[0];
            return this.remove_node
        } else if (node.hasOwnProperty('nodes')) {
            let is_found = this.remove_node_from_nodes(id, node.nodes)

            if (is_found)
                return is_found
        }
    }

    return false
  }

  add_node_to_nodes(id, new_node, node_arr) {
      for (let node of node_arr) {
        if (node['model_id'] == id){
            if (!node.hasOwnProperty('nodes'))
                node.nodes = []
            
            node.nodes.push(new_node)
        } else if (node.hasOwnProperty('nodes')) {
            let is_found = this.add_node_to_nodes(id, new_node, node.nodes)

            if (is_found)
                return is_found
        }
      }

      return false
  }

  move_node(move_id, container_id) {
      this.remove_node_from_nodes(move_id, this.get_all_nodes())
      this.add_node_to_nodes(container_id, this.remove_node, this.get_all_nodes())
  }
}