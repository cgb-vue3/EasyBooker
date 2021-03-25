<template>
	<column-list :ColumnList="Columns"></column-list>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import ColumnList from '../components/ColumnList.vue'

export default defineComponent({
	name: 'Home',
	components: {
		ColumnList,
	},
	setup() {
		const store = useStore()

		onMounted(() => {
			store.dispatch('getColumns', {
				currentPage: 1,
				pageSize: 3,
			})
		})

		const Columns = computed(() => {
			return store.state.columns
		})

		return {
			Columns,
		}
	},
})
</script>