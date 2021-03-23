<template>
	<div class="dropdown">
		<button
			class="btn btn-primary btn-sm dropdown-toggle px-3 shadow-none"
			type="button"
			id="dropdownMenuButton"
			data-bs-toggle="dropdown"
			aria-expanded="false"
			@click="isShowRef = !isShowRef"
			ref="dropdownRef"
		>
			{{ DropDownTitle }}
		</button>
		<ul
			v-if="isShowRef"
			class="dropdown-menu py-0"
			aria-labelledby="dropdownMenuButton"
			:style="{ display: 'block' }"
		>
			<slot></slot>
		</ul>
	</div>
</template>
<script>
import { defineComponent, ref, watch, computed } from 'vue'
import useClickOutside from '../hooks/useClickOutside.ts'

export default defineComponent({
	props: {
		title: {
			type: String,
			default: 'DropDown',
		},
	},
	setup(props) {
		const DropDownTitle = computed(() => {
			return props.title
		})
		const isShowRef = ref(false)
		const dropdownRef = ref(null)

		const isOut = useClickOutside(dropdownRef)
		watch(isOut, () => {
			if(isOut.value) {
				isShowRef.value = false
			}
		})
		return {
			DropDownTitle,
			isShowRef,
			dropdownRef,
		}
	},
})
</script>
<style lang="scss" scoped>
.btn-primary {
	&:hover {
		background-color: #fff;
		color: #0d6efd;
	}
}
</style>