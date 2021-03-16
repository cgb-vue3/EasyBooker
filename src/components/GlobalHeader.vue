<template>
	<nav class="navbar navbar-light bg-white">
		<div class="container-fluid">
			<a class="navbar-brand text-primary">U-LOG</a>
			<form class="d-flex">
				<button type="button" class="btn btn-outline-primary btn-sm me-2 px-3">
					登录
				</button>
				<button type="button" class="btn btn-outline-primary btn-sm me-2">
					注册
				</button>
			</form>
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'App',
})
</script>

<style lang="scss">
</style>
