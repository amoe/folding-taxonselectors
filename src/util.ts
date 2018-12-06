import { MyNodeModel, MyNode } from '@/types';
import { Node } from 'tree-model';

function findValidChildren(
    rootNode: Node<MyNodeModel>, wantedPath: number[]
): string[] {
    // Find the leaf of the path...
    const leaf = wantedPath[wantedPath.length - 1]

    const result = rootNode.all(function(node): boolean {
        return node.model.id === leaf;
    });

    // FIXME: check result has one item

    const children: MyNode[] = result[0].children;
    return children.map(n => n.model);
}


export default { findValidChildren };

