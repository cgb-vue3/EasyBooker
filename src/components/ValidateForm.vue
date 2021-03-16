<template>
	<form class="validate-form">
		<slot name="default"></slot>
		<div class="submit-area d-flex justify-content-center" @click.prevent="submitForm">
			<slot name="submit">
				<button type="submit" class="btn btn-primary px-4 shadow-none">确定</button>
			</slot>
		</div>
	</form>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	setup(props, context) {
		const submitForm = () => {
			context.emit('form-submit', true)
		}
		return {
			submitForm,
		}
	},
})
</script>