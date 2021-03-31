<template>
	<nav class="navbar navbar-light bg-white">
		<div class="container-fluid">
			<router-link to="/" class="navbar-brand text-primary">
				<svg t="1617155742927" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14027" width="32" height="32"><path d="M896 185.173333a52.906667 52.906667 0 0 0-46.08-9.813333L554.666667 251.306667v608.853333l322.56-82.773333A53.333333 53.333333 0 0 0 917.333333 725.333333V226.986667a53.333333 53.333333 0 0 0-21.333333-41.813334zM469.333333 251.306667L173.226667 175.36A54.186667 54.186667 0 0 0 128 185.173333a53.333333 53.333333 0 0 0-20.48 42.666667V725.333333a53.333333 53.333333 0 0 0 40.106667 51.626667L469.333333 860.16z" p-id="14028" fill="#37597d"></path></svg>
				<span class="title mx-2">简读</span>
			</router-link>
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
				<template v-slot:dropdownTitle>
					<img :src="User.avatar.url" alt="" class="avatar">
				</template>

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
.title {
	color: #37597d;
	vertical-align: bottom;
}

.avatar {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	cursor: pointer;
}
</style>
