<template>
	<div class="bg-white border-bottom">
		<div class="container w-75">
			<GlobalHeader :user="user" />
		</div>
	</div>

	<div class="container bg-white w-75 mt-3 shadow-lg p-3">
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import GlobalHeader from './components/GlobalHeader.vue'
import { useStore } from 'vuex'

export default defineComponent({
	name: 'App',
	components: {
		GlobalHeader,
	},
	setup() {
		const user = computed(() => useStore().state.user)
		return {
			user,
		}
	},
})
</script>

<style lang="scss">
#app {
	background-color: #f4f5f5;
	padding-bottom: 100px;
}
</style>
