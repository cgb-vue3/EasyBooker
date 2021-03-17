<template>
	<column-list :ColumnList="Columns"></column-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList from '../components/ColumnList.vue'
import { Columns } from '../hooks/testData'

export default defineComponent({
	name: 'Home',
	components: {
		ColumnList,
	},
	setup() {
		return {
			Columns,
		}
	},
})
</script>