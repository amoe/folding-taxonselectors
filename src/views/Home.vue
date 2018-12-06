<template>
  <div class="home">
    <div class="compound-widget">
      <div class="taxon-selector">
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
}

const config = {};
const t = new TreeModel(config)

export default Vue.extend({
    name: 'home',
    components: {},
    data(): any {
        return {
            taxonSelectors: []
        };
    },
    created() {
        this.addNewCompoundWidget();
    },
    methods: {
        addNewCompoundWidget() {
            const newTaxonSelector: object = {};
            this.taxonSelectors.push(newTaxonSelector);
        }
    }
});
</script>

<style lang="less">
.compound-widget {
    border: 1px solid black;
    padding: 1em;
}

.taxon-selector {
    border: 1px solid red;
    height: 200px;
    width: 100px;
}
</style>
