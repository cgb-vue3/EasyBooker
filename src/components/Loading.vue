<template>
	<div class="text-center loading">
		<div class="spinner-border text-primary" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'Loading',
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