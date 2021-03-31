<template>
	<div class="container bg-white w-75 mt-4 shadow-lg p-4 main column-detail">
		<div class="d-flex p-3 mb-4 border-bottom">
			<img
				:src="column.avatar && column.avatar.url"
				:alt="column.title"
				class="rounded-circle column-avatar"
			/>
			<div class="card-content">
				<h5 class="card-title">{{ column.title }}</h5>
				<p class="card-text">
					{{ column.description + '...' }}
				</p>
			</div>
		</div>

		<post-list :Posts="posts"></post-list>
		<div class="d-flex justify-content-center">
			<button type="button" class="btn btn-outline-primary" @click="loadMore" v-if="isLastPage">加载更多</button>
		</div>
	</div>
</template>
<script>
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PostList from '../components/PostList.vue'
import { useStore } from 'vuex'
import useLoadMore from '../hooks/useLoadMore'

export default defineComponent({
	components: {
		PostList,
	},
	setup() {
		const route = useRoute()
		const store = useStore()
		const payload = {
			columnId: route.params.id,
			currentPage: 1,
			pageSize: 2,
		}
		onMounted(() => {
			store.dispatch('getPosts', payload)

			if (store.state.user.column === route.params.id) {
				store.dispatch('getColumn', route.params.id)
			}
		})

		const column = computed(() => {
			if (store.state.user.column === route.params.id) {
				return store.state.column
			} else {
				return store.getters.getColumnById(route.params.id)
			}
		})

		const posts = computed(() => store.state.posts)
		const loadMorePage = useLoadMore('getPosts', payload)
		const loadMore = loadMorePage.loadMorePage
		const isLastPage = loadMorePage.isLastPage
		return {
			route,
			column,
			posts,
			loadMore,
			isLastPage,
		}
	},
})
</script>
<style lang="scss" scoped>
.column-detail {
	.column-avatar {
		box-sizing: border-box;
		// padding: 20px 20px 0 0 ;
		margin-right: 30px;
		width: 150px;
		height: 150px;
	}
}
</style>