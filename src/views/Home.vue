<template>
  <div class="home">
    <div class="compound-widget">
      <div  v-for="ts in taxonSelectors" class="taxon-selector">
        <select id="pet-select">
          <option value="" selected disabled hidden>Choose here</option>
          <option v-for="value in taxonomyLevelIndex[0]">{{value}}</option>
        </select>
        <div class="create-next-level-ts-button" v-on:click="addNewTaxonSelector"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TreeModel from 'tree-model';

// For this demo, there's just one compound widget, and that can be modified

const TAXONOMY_DATA = {
    'children': [{'content': 'Rock', 'id': 1, 'label': 'Taxon'},
                 {'content': 'Classical', 'id': 2, 'label': 'Taxon'}],
    'content': 'Music',
    'id': 0,
    'label': 'Taxon'
};

interface MyNodeModel {
    content: string;
    id: number;
    label: string;
};

interface LevelIndex {
    [key: string]: string[];
}


const config = {};
const treeModel = new TreeModel(config)
const root = treeModel.parse<MyNodeModel>(TAXONOMY_DATA);

export default Vue.extend({
    name: 'home',
    components: {},
    data(): any {
        return {
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
            const newTaxonSelector: object = {};
            this.taxonSelectors.push(newTaxonSelector);
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

                console.log("node content: ", node.model.content);
                result[level].push(node.model.content);
                return true;
            });

            console.log("generated index: %o", result);

            return result;
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
