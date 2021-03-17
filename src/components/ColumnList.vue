<template>
	<div class="row gy-4">
		<div class="col-4" v-for="column in Columns" :key="column._id">
			<div class="card py-3">
				<img
					:src="column.avatar.url"
					class="card-img-top"
					:alt="column.avatar.filename"
				/>
				<div class="card-body">
					<h5 class="card-title">{{ column.title }}</h5>
					<div class="card-text">
						{{ column.description }}
					</div>
					<router-link
						class="btn btn-primary"
						:to="{ name: 'columns', params: { id: column._id } }"
					>
						进入专栏
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
type Avatar = {
	_id: string;
	url?: string;
	filename: string;
	extname: string;
	__v: number;
	createdAt: string;
}

export interface ColumnProps {
	_id: string;
	title: string;
	description: string;
	author: string;
	featured: boolean;
	avatar: Avatar;
	__v?: number;
	createdAt?: string;
}
export default defineComponent({
	props: {
		ColumnList: {
			type: Array as PropType<ColumnProps[]>,
			required: true,
		},
	},
	setup(props) {
		props.ColumnList.forEach((ele) => {
			if (!ele.avatar.url) {
				ele.avatar.url = require('../assets/avatar.jpg')
			}
		})
		const Columns = ref(props.ColumnList)

		return {
			Columns,
		}
	},
})
</script>

<style lang="scss" scoped>
.card {
	display: flex;
	justify-content: center;

	.card-img-top {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		margin: 0 auto;
	}

	.card-body {
		text-align: center;

		.card-text {
			text-align: start;
			overflow: hidden;
			height: 80px;
			color: #666;
			font-size: 14px;
		}
	}
}
</style>