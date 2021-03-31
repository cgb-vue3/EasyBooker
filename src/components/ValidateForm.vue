<template>
	<form class="validate-form">
		<slot name="default"></slot>
		<div class="submit-area d-flex justify-content-center">
			<button
				type="submit"
				class="btn btn-primary px-4 shadow-none w-100"
				@click.prevent="submitForm"
			>
				<slot name="submit"> 确定 </slot>
			</button>
		</div>
	</form>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

export const emitter = mitt()

type validateFunc = () => boolean

export default defineComponent({
	setup(props, context) {
		let funcArr: validateFunc[] = []

		const callback = (func: validateFunc) => {
			funcArr.push(func)
		}

		emitter.on('item-created', callback as validateFunc)

		onUnmounted(() => {
			// 删除监听
			emitter.off('item-created', callback as validateFunc)
			funcArr = []
		})
		const submitForm = () => {
			const result: boolean = funcArr
				.map((func) => func())
				.every((result) => result)
			context.emit('form-submit', result)
		}

		return {
			submitForm,
		}
	},
})
</script>