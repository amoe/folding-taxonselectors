<template>
  <div class="home">
    <div class="compound-widget">
      <div  v-for="ts in taxonSelectors" class="taxon-selector">
        <select id="pet-select">
          <option value="" selected disabled hidden>Choose here</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
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
        taxonomyLevelIndex() {
            const i = 0;
            const result: LevelIndex = {};
            result[i] = [];
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
