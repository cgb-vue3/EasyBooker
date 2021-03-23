<template>
	<div id="App">
		<div class="bg-white border-bottom">
			<div class="container w-75">
				<GlobalHeader />
			</div>
		</div>

		<div class="container bg-white w-75 mt-3 shadow-lg p-3 main" v-show="!isLoading">
			<router-view></router-view>
		</div>
		<loading v-if="isLoading" :style="{color: '#0d6efd'}"  ></loading>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import GlobalHeader from './components/GlobalHeader.vue'
import Loading from './components/Loading.vue'

import { useStore } from 'vuex'

export default defineComponent({
	name: 'App',
	components: {
		GlobalHeader,
		Loading,
	},
	setup() {
		const store = useStore()
		const isLoading = computed(() => store.state.loading)
		onMounted(() => {
			const token = store.state.token
			if ( token && !store.state.user.isLogin) {
				store.dispatch('getUser', token)
			}
		})

		const isError = computed(() => store.state.error)
		return {
			isLoading,
			isError
		}
	},
})
</script>

<style lang="scss">
body {
	background-color: #f4f5f5;
}

#app {
	height: 100%;
	padding-bottom: 100px;
	
}
</style>
