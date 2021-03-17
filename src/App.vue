<template>
	<div class="bg-white border-bottom">
		<div class="container w-75">
			<GlobalHeader :user="User" />
		</div>
	</div>

	<div class="container bg-white w-75 mt-3 shadow-lg p-3">
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'

const User: UserProps = {
	isLogin: false,
	name: 'DUING',
	id: 101,
}


export default defineComponent({
	name: 'App',
	components: {
		GlobalHeader,
	},
	setup() {
		return {
			User,
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
