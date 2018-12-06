import { Node } from 'tree-model';

export interface MyNodeModel {
    content: string;
    id: number;
    label: string;
}

export type MyNode = Node<MyNodeModel>

