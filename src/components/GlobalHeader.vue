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
			
			<drop-down :title="User.nickName" v-else>
				<drop-down-item @click="createPost"> 新建文章 </drop-down-item>
				<drop-down-item @click="handleEdit"> 编辑资料 </drop-down-item>
				<drop-down-item @click="myColumn"> 我的专栏 </drop-down-item>
				<drop-down-item @click="handleQuit"> 退出 </drop-down-item>
			</drop-down>
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import DropDown from './DropDown.vue'
import DropDownItem from './DropDownItem.vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export interface UserProps {
	isLogin: boolean;
	nickName: string;
	id?: number;
}
export default defineComponent({
	name: 'GlobalHeader',
	components: {
		DropDownItem,
		DropDown,
	},
	setup() {
		const store = useStore()
		const router = useRouter()
		const createPost = () => {
			router.push('/create')
		}
		const handleQuit = () => {
			router.push('/')
			store.commit('logOut')
		}
		const handleEdit = () => {
			router.push({name: 'edit'})
		}
		const myColumn = () => {
			const columnId = store.state.user.columnId
			router.push({name: 'columns', params: { id: columnId }})
		}
		const User = computed(() => {
			return store.state.user
		})

		return {
			User,
			handleQuit,
			createPost,
			myColumn,
			handleEdit
		}
	},
})
</script>

<style lang="scss">
</style>
