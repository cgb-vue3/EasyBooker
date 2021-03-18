<template>
	<div id="App">
		<message  :message="isError"></message>
		<div class="bg-white border-bottom">
			<div class="container w-75">
				<GlobalHeader :user="user" />
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
import Message from "./components/Message.vue";

import { useStore } from 'vuex'

export default defineComponent({
	name: 'App',
	components: {
		GlobalHeader,
		Loading,
		Message
	},
	setup() {
		const store = useStore()
		const user = computed(() => store.state.user)
		const isLoading = computed(() => store.state.loading)
		onMounted(() => {
			const token = store.state.token
			if ( token && !store.state.user.isLogin) {
				store.dispatch('getUser', token)
			}
		})

		const isError = computed(() => store.state.error)
		return {
			user,
			isLoading,
			isError
		}
	},
})
</script>

<style lang="scss">
#app {
	background-color: #f4f5f5;
	padding-bottom: 100px;

	.main {
		min-height: 100vh;
	}
}
</style>
