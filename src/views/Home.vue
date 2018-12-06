<template>
  <div class="home">
    <div class="compound-widget">
      <div  v-for="(ts, depth) in taxonSelectors" class="taxon-selector">
        <select v-model="selected[depth]">
          <option value="" selected disabled hidden>Choose here</option>
          <option v-for="node in filterTaxons(depth)">{{node.content}}</option>
        </select>

        <div v-if="depth < highestLevel && selected[depth]"
             class="create-next-level-ts-button" v-on:click="addNewTaxonSelector"/>
      </div>
    </div>
    
    {{highestLevel}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TreeModel from 'tree-model';
import {MyNodeModel, MyNode} from '@/types';
import util from '@/util';

// For this demo, there's just one compound widget, and that can be modified

const TAXONOMY_DATA = {
    'children': [{'content': 'Rock', 'id': 1, 'label': 'Taxon',
                  'children': [{'content': 'Metal', 'id': 3, 'label': 'Taxon'}]},
                 {'content': 'Classical', 'id': 2, 'label': 'Taxon',
                  'children': [{'content': 'Baroque', 'id': 4, 'label': 'Taxon'}]}],
    'content': 'Music',
    'id': 0,
    'label': 'Taxon'
};


interface LevelIndex {
    [key: string]: MyNodeModel[];
}

interface TaxonSelectorSpec {
};

interface ComponentData {
    selected: string[];
    taxonSelectors: TaxonSelectorSpec[];
};


const config = {};
const treeModel = new TreeModel(config)
const root = treeModel.parse<MyNodeModel>(TAXONOMY_DATA);

export default Vue.extend({
    name: 'home',
    components: {},
    data(): ComponentData {
        return {
            selected: [],
            taxonSelectors: []
        };
    },
    created() {
        this.addNewTaxonSelector();
    },
    mounted() {
        console.log("Foo is %o", root);
    },
    methods: {
        addNewTaxonSelector() {
            const newTaxonSelector: TaxonSelectorSpec = {};
            this.taxonSelectors.push(newTaxonSelector);
        },
        filterTaxons(depth: number) {
            console.log("selected value is %o", this.selected);
            return this.taxonomyLevelIndex[depth];
        }
    },
    computed: {
        taxonomyLevelIndex(): LevelIndex {
            const i = 0;
            const result: LevelIndex = {};

            root.walk(function (node): boolean {
                const level = node.getPath().length - 1;

                if (!(level in result)) {
                    result[level] = [];
                }

                result[level].push(node.model);
                return true;
            });

            console.log("generated index: %o", result);

            return result;
        },
        highestLevel(): number {
            const availableLevels = Object.keys(this.taxonomyLevelIndex);
            availableLevels.sort();
            availableLevels.reverse();
            return parseInt(availableLevels[0]);
        }
    }
});
</script>

<style lang="less">
.compound-widget {
    border: 1px solid black;
    padding: 1em;

    display: flex;
    flex-direction: row;
}

.compound-widget > * {
    margin: 10px;
}

.taxon-selector {
    border: 1px solid red;
    height: 200px;
    width: 100px;
}

.create-next-level-ts-button {
    width: 32px;
    height: 32px;
    background-color: green;
}
</style>
