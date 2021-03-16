<template>
	<nav class="navbar navbar-light bg-white">
		<div class="container-fluid">
			<a class="navbar-brand text-primary">U-LOG</a>
			<form class="d-flex" v-if="!User.isLogin">
				<button type="button" class="btn btn-outline-primary btn-sm me-2 px-3">
					登录
				</button>
				<button type="button" class="btn btn-outline-primary btn-sm me-2">
					注册
				</button>
			</form>
			<drop-down :title="User.name" v-else>
				<drop-down-item>
					编辑
				</drop-down-item>
				<drop-down-item>
					我的专栏
				</drop-down-item>
				<drop-down-item>
					退出
				</drop-down-item>
			</drop-down>
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import DropDown from './DropDown.vue'
import DropDownItem from './DropDownItem.vue'

export interface UserProps {
	isLogin: boolean;
	name: string;
	id?: number;
}
export default defineComponent({
	name: 'GlobalHeader',
	components: {
		DropDownItem,
		DropDown
	},
	props: {
		user: {
			type: Object as PropType<UserProps>,
			required: true
		}
	},
	setup(props) {
		const User = ref(props.user)

		return {
			User
		}
	}
})
</script>

<style lang="scss">
</style>
