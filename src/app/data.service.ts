import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ModelPanel, PanelType } from './shared/panel.model';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from './notification.service';
import { SAMPLETREE } from './shared/panel.model';

@Injectable()
export class DataService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    private all_nodes = JSON.parse(JSON.stringify(SAMPLETREE));

    private remove_node: any;

    panels: ModelPanel[] = [];

    constructor(private http: Http, private notificationService: NotificationService) {
        this._convertToTreeStructure(this.all_nodes);
    }


    loadModelPanel(panelAction) {
        this.notificationService.onPanelChange(panelAction);
    }

    displayPanel(panelAction) {

        var modelPanel: ModelPanel = {
            title: "string",
            panelType: panelAction.panelType,
            model: null
        };

        if (panelAction.display == 'replace') {
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
            if (node['model_id'] == id) {
                this.remove_node = node_arr.splice(node_arr.indexOf(node), 1)[0];
                this.remove_node['parent_id'] = '-1'
                return this.remove_node
            } else if (node.hasOwnProperty('nodes')) {
                let is_found = this.remove_node_from_nodes(id, node.nodes)

                if (is_found)
                    return is_found
            }
        }

        return false
    }

    add_node_to_nodes(id, node_arr) {
        for (let node of node_arr) {
            if (node['model_id'] == id) {
                if (!node.hasOwnProperty('nodes'))
                    node.nodes = []

                this.remove_node['parent_id'] = node['children_id']
                node.nodes.push(this.remove_node)
                this.remove_node = null
            } else if (node.hasOwnProperty('nodes')) {
                let is_found = this.add_node_to_nodes(id, node.nodes)

                if (is_found)
                    return is_found
            }
        }

        return false
    }

    add_new_node(container_id, new_node, node_arr) {
        for (let node of node_arr) {
            if (node['model_id'] == container_id) {
                if (!node.hasOwnProperty('nodes'))
                    node.nodes = []
                
                node.nodes.push(new_node)
            } else if (node.hasOwnProperty('nodes')) {
                let is_found = this.add_new_node(container_id, new_node, node.nodes)

                if (is_found)
                    return is_found
            }
        }

        return false
    }

    // move_id, cotnainer_id are 'model_id'
    move_node(move_id, container_id) {
        this.remove_node_from_nodes(move_id, this.get_all_nodes())
        this.add_node_to_nodes(container_id, this.get_all_nodes())
    }

    insert_node(node_id, node_arr = this.get_all_nodes()) {
        for (let node of node_arr) {
            if (node['model_id'] == node_id) {
                node_arr.splice(node_arr.indexOf(node), 0, this.remove_node);
                this.remove_node = null

                return true
            } else if(node.hasOwnProperty('nodes')) {
                this.insert_node(node_id, node['nodes'])
            }
        }

        return false
    }

    move_to_before(before_id, after_id) {
        this.remove_node_from_nodes(before_id, this.get_all_nodes())
        this.insert_node(after_id)
    }

    get_last_child_node(children_id, node_arr = this.get_all_nodes()) {
        for (let node of node_arr) {
            if (node['children_id'] == children_id) {
                if (node.hasOwnProperty('nodes'))
                    return node['nodes'][node['nodes'].length - 1]
            } else if (node.hasOwnProperty('nodes')) {
                let last_child_node = this.get_last_child_node(children_id, node['nodes'])

                if (last_child_node)
                    return last_child_node
            }
        }

        return false;
    }

    get_parent_node_from_child_id(children_id, node_arr = this.get_all_nodes()) {
        for (let node of node_arr) {
            if (node['children_id'] == children_id) {
                return node
            } else if (node.hasOwnProperty('nodes')) {
                let parent_node = this.get_parent_node_from_child_id(children_id, node['nodes'])

                if (parent_node)
                    return parent_node
            }
        }

        return false
    }

    move_to_root_tree(move_id) {
        this.remove_node_from_nodes(move_id, this.get_all_nodes())
        this.get_model_tree()['nodes'].push(this.remove_node)
        this.remove_node = null
    }
}