<template>
	<div class="dropdown">
		<button
			class="btn btn-primary btn-sm dropdown-toggle px-3 shadow-none"
			type="button"
			id="dropdownMenuButton"
			data-bs-toggle="dropdown"
			aria-expanded="false"
            @click="isShow = !isShow"
		>
			{{ DropDownTitle }}
		</button>
		<ul
            v-if="isShow"
			class="dropdown-menu py-0"
			aria-labelledby="dropdownMenuButton"
			:style="{ display: 'block' }"
		>
			<slot></slot>
		</ul>
	</div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
	props: {
		title: {
			type: String,
			default: 'DropDown',
		},
	},
	setup(props) {
		const DropDownTitle = ref(props.title)
		const isShow = ref(false)
		return {
			DropDownTitle,
			isShow,
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