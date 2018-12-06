import { MyNodeModel, MyNode } from '@/types';
import { Node } from 'tree-model';

function getVirtualRoot(rootNode: MyNode, wantedPath: number[]): MyNode {
    if (wantedPath.length === 0) {
        return rootNode;
    }

    // Find the leaf of the path...
    const leaf = wantedPath[wantedPath.length - 1]
    const result = rootNode.all(function(node): boolean {
        return node.model.id === leaf;
    });
    if (result.length === 1) {
        return result[0];
    } else {
        throw new Error("not found");
    }
}

function findValidChildren(
    rootNode: Node<MyNodeModel>, wantedPath: number[]
): MyNodeModel[] {
    const virtualRoot: MyNode = getVirtualRoot(rootNode, wantedPath);
    const children: MyNode[] = virtualRoot.children;
    return children.map(n => n.model);
};

export default { findValidChildren };

