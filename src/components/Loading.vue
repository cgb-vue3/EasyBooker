<template>
	<div class="text-center loading">
		<div class="spinner-border border-2" role="status"></div>
		<span class="px-3"> {{ text }}</span>
	</div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'Loading',
	props: {
		text: {
			type: String,
			default: 'Loading...',
		},
	},
})
</script>

<style lang="scss" scoped>
.loading {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.2);
}
</style>