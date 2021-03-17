<template>
	<div class="container w-75 column-detail">
		<div class="d-flex p-3 mb-4 border-bottom">
			<img :src="column.avatar.url" :alt="column.title" class="rounded-circle column-avatar" />
			<div class="card-content">
				<h5 class="card-title">{{ column.title }}</h5>
				<p class="card-text">
					{{ column.description + '...' }}
				</p>
			</div>
		</div>

		<post-list :Posts="Posts"></post-list>
	</div>
</template>
<script>
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '../components/PostList.vue'
import {Columns, Posts} from '../hooks/testData'


export default defineComponent({
	components: {
        PostList,
    },
	setup() {
        const route = useRoute()
        const column = Columns.filter(column => column._id == route.params.id)[0]

		return {
            route,
            column,
            Posts
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