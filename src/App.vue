<template>
	<div class="bg-white border-bottom">
		<div class="container bg-white w-75">
			<GlobalHeader msg="Welcome to Your Vue.js + TypeScript App" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from './components/GlobalHeader.vue'

export default defineComponent({
	name: 'App',
	components: {
		GlobalHeader,
	},
})
</script>

<style lang="scss">
#app {
	background-color: #f4f5f5;
}
</style>
