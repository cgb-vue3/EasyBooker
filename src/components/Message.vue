<template>
	<div
        v-if="Error.status"
		class="alert alert-warning alert-dismissible fade show message"
		role="alert"
	>
		<i class="bi bi-info-circle"></i>
		<span class="ms-3">{{ Error.message }}</span>
		<button type="button" class="btn-close shadow-none" @click="Error.status = false"></button>
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

interface MessageProps {
	type: 'success' | 'error' | 'tips';
	message: string;
	status: boolean;
}

export default defineComponent({
	props: {
		message: {
			type: Object as PropType<MessageProps>,
		},
	},
	setup(props) {
        const Error = computed(() => props.message)
		
		return {
			Error,
		}
	},
})
</script>
<style lang="scss" scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css');

.message {
	position: fixed;
	z-index: 199;
	top: 30px;
	left: 50%;
	width: 400px;
	transform: translate(-50%, 0);

	.btn-close {
		font-size: 12px;
		color: #ccc;
	}
}
</style>