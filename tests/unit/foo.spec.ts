import TreeModel from 'tree-model';
import { Node } from 'tree-model';

const TAXONOMY_DATA = {
    'children': [{
        'content': 'Rock', 'id': 1, 'label': 'Taxon',
        'children': [{ 'content': 'Metal', 'id': 3, 'label': 'Taxon' }]
    },
    {
        'content': 'Classical', 'id': 2, 'label': 'Taxon',
        'children': [{ 'content': 'Baroque', 'id': 4, 'label': 'Taxon' }]
    }],
    'content': 'Music',
    'id': 0,
    'label': 'Taxon'
};

interface MyNodeModel {
    content: string;
    id: number;
    label: string;
};

type MyNode = Node<MyNodeModel>;

const config = {};
const treeModel = new TreeModel(config);
const root = treeModel.parse<MyNodeModel>(TAXONOMY_DATA);

const WANTED_PATH = [0, 2];

function findValidChildren(
    rootNode: Node<MyNodeModel>, wantedPath: number[]
): string[] {
    // Find the leaf of the path...
    const leaf = wantedPath[wantedPath.length - 1]

    const result = rootNode.all(function(node): boolean {
        return node.model.id === leaf;
    });



    const children: MyNode[] = result[0].children;
    return children.map(n => n.model.content);
}

describe('my suite', () => {
    it('can do arithmetic', () => {
        const result = findValidChildren(root, WANTED_PATH);
        expect(result).toEqual(['Baroque']);
    });
});
