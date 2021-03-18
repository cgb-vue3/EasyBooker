<template>
	<div class="container w-75 column-detail">
		<div class="d-flex p-3 mb-4 border-bottom">
			<img :src="columns.avatar && columns.avatar.url" :alt="columns.title" class="rounded-circle column-avatar" />
			<div class="card-content">
				<h5 class="card-title">{{ columns.title }}</h5>
				<p class="card-text">
					{{ columns.description + '...' }}
				</p>
			</div>
		</div>

		<post-list :Posts="posts"></post-list>
	</div>
</template>
<script>
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PostList from '../components/PostList.vue'
import {useStore} from 'vuex'

export default defineComponent({
	components: {
        PostList,
    },
	setup() {
		const route = useRoute()
		const router = useStore()
		const store = useStore()

		onMounted(()=> {
			store.dispatch('getPosts', route.params.id)
			store.dispatch('getColumn', route.params.id)
		})

        const columns = computed(() => store.state.column)
 
		const posts = computed(() => store.state.posts)

		return {
            route,
            columns,
            posts
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