import TreeModel from 'tree-model';
import util from '@/util';
import { MyNodeModel } from '@/types'

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

const WANTED_PATH = [0, 2];

const config = {};
const treeModel = new TreeModel(config);
const root = treeModel.parse<MyNodeModel>(TAXONOMY_DATA);

describe('my suite', () => {
    it('can do arithmetic', () => {
        const result = util.findValidChildren(root, WANTED_PATH);
        expect(result).toEqual(
            [{ 'content': 'Baroque', 'id': 4, 'label': 'Taxon' }]
        );
    });
});
