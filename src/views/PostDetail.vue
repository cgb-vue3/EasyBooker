<template>
	<div class="container w-75 post-detail">
		<nav aria-label="breadcrumb ">
			<ol class="breadcrumb p-3">
				<li class="breadcrumb-item">
					<router-link to="/"> 首页 </router-link>
				</li>
				<li class="breadcrumb-item">
					<router-link
						:to="{
							name: 'columns',
							params: {
								id: post.column,
							},
						}"
					>
						专栏首页
					</router-link>
				</li>
				<li class="breadcrumb-item active" aria-current="page">
					{{ post.title }}
				</li>
			</ol>
		</nav>

		<div class="post-header border-bottom">
			<img :src="post.image && post.image.url" :alt="post.title" />
			<h2>{{ post.title }}</h2>
		</div>
		<div
			class="post-author d-flex justify-content-between py-3 align-items-center border-bottom"
		>
			<div class="d-flex justify-content-between">
				<!-- <img
					:src="post.author.avatar && post.author.avatar.url"
					alt="desc"
					class="rounded-circle mx-2 p-2 border border-1 avatar"
				/> -->
				<div>
					<h6 class="mt-2">
						{{ post.author && post.author.nickName }}
					</h6>
					<span class="text-secondary align-middle">{{
						post.author && post.author.description
					}}</span>
				</div>
			</div>
			<span class="text-secondary">{{ post.createdAt }}</span>
		</div>
		<div class="my-5" v-html="post.content"></div>

		<div class="btn-group" role="group">
			<router-link
				:to="{
					name: 'updatePost',
					query: { id: post._id },
					params: { post: JSON.stringify(post)},
				}"
				type="button"
				class="btn btn-success px-3"
			>
				编辑
			</router-link>
			<button type="button" class="btn btn-danger px-3">删除</button>
		</div>
	</div>
</template>


<script>
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default defineComponent({
	props: {},
	setup(props) {
		const store = useStore()
		const route = useRoute()
		onMounted(() => {
			store.dispatch('getPostById', route.params.id)
		})
		const post = computed(() => {
			return store.state.post
		})

		console.log('post', post.value)

		return {
			post,
		}
	},
})
</script>
<style lang="scss" scoped>
.post-detail {
	nav {
		background-color: #dedede;
	}
	.post-header {
		img {
			height: 300px;
			width: 100%;
			margin-bottom: 20px;
		}
		h2 {
			margin-bottom: 20px;
		}
	}

	.avatar {
		width: 80px;
		height: 80px;
	}
}
</style>