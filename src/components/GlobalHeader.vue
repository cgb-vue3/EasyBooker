<template>
	<nav class="navbar navbar-light bg-white">
		<div class="container-fluid">
			<router-link to="/" class="navbar-brand text-primary">U-LOG</router-link>
			<form class="d-flex" v-if="!User.isLogin">
				<router-link :to="{ name: 'login' }">
					<button
						type="button"
						class="btn btn-outline-primary btn-sm me-2 px-3 shadow-none"
					>
						登录
					</button>
				</router-link>

				<router-link :to="{ name: 'register' }">
					<button
						type="button"
						class="btn btn-outline-primary btn-sm me-2 px-3 shadow-none"
					>
						注册
					</button>
				</router-link>
			</form>
			<drop-down :title="User.name" v-else>
				<drop-down-item> 编辑 </drop-down-item>
				<drop-down-item> 我的专栏 </drop-down-item>
				<drop-down-item> 退出 </drop-down-item>
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
		DropDown,
	},
	props: {
		user: {
			type: Object as PropType<UserProps>,
			required: true,
		},
	},
	setup(props) {
		const User = ref(props.user)

		return {
			User,
		}
	},
})
</script>

<style lang="scss">
</style>
