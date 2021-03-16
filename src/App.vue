<template>
	<div class="bg-white border-bottom">
		<div class="container w-75">
			<GlobalHeader msg="Welcome to Your Vue.js + TypeScript App" />
			
		</div>
	</div>

	<div class="container bg-white w-75 mt-3 shadow-lg p-3">
		<column-list :ColumnList="Columns"></column-list>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from './components/GlobalHeader.vue'
import ColumnList from './components/ColumnList.vue'
import {Columns} from './hooks/testData'

export default defineComponent({
	name: 'App',
	components: {
		GlobalHeader,
		ColumnList
	},
	setup() {
		return {
			Columns
		}
	}
})
</script>

<style lang="scss">
#app {
	background-color: #f4f5f5;
	padding-bottom: 100px;
}
</style>
