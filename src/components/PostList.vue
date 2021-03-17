<template>
	<div class="post-list">
		<div
			class="card bg-white text-secondary p-3"
			v-for="post in Posts"
			:key="post._id"
		>
			<h4>
				<router-link to="/" class="card-title">
					{{ post.title }}
				</router-link>
			</h4>
			<div class="card-content">
				<img :src="post.image.url" class="card-img" alt="..." />
				<p>{{ post.excerpt }}</p>
			</div>
			<p class="card-text">{{ post.createdAt }}</p>
		</div>
	</div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		Posts: Array,
	},
})
</script>
<style lang="scss" scoped>
.post-list {
	.card {
		.card-title {
            text-decoration: none;
            color: #333;
            
			&:hover {
				color: #0d6efd;
			}
		}

		.card-content {
			display: flex;

			.card-img {
				box-sizing: border-box;
				padding: 10px 20px 20px 0;
				width: 200px;
				height: 120px;
			}
			p {
				word-break: break-all;
			}
		}
	}
}
</style>