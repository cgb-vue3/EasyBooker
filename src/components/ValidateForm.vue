<template>
	<form class="validate-form">
		<slot name="default"></slot>
		<div
			class="submit-area d-flex justify-content-center"
		>
			<slot name="submit">
				<button type="submit" class="btn btn-primary px-4 shadow-none" @click.prevent="submitForm">
					确定
				</button>
			</slot>
		</div>
	</form>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, PropType, onUnmounted } from 'vue'
import mitt from 'mitt'

export const emitter = mitt()

type validateFunc = () => boolean

export default defineComponent({
	setup(props, context) {
		let funcArr: validateFunc[] = []

		emitter.on('item-created', (func) => {
			funcArr.push(func)
		})
		onUnmounted(() => {
			// 删除监听
			emitter.all.clear()
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