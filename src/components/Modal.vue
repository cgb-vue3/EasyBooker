<template>
	<div class="modal d-block" tabindex="-1" v-if="isShow">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header py-2">
					<h5 class="modal-title">提示！</h5>
					<button
						type="button"
						class="btn-close shadow-none fs-6"
						data-bs-dismiss="modal"
						aria-label="Close"
                        @click="isShow = false"
					></button>
				</div>

				<div class="modal-body py-3">
					<slot>
                        你确定要执行这条操作吗？
                    </slot>
				</div>
				<div class="modal-footer py-2">
					<button
						type="button"
						class="btn btn-secondary shadow-none fs-6"
						data-bs-dismiss="modal"
                         @click="handleCancel"
					>
						取消
					</button>
					<button type="button" class="btn btn-primary shadow-none fs-6" @click="handleEnsure">
						确定
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { defineComponent,ref } from 'vue'

export default defineComponent({
	props: {
    },
    emits: ['click-cancel', 'click-ensure'],
	setup(props, ctx) {
        const isShow = ref(true)
        const handleCancel = () => {
            isShow.value = false
            ctx.emit('click-cancel')
        }
        const handleEnsure = () => {
            isShow.value = false
            ctx.emit('click-ensure')
        }
		return {
            handleCancel,
            handleEnsure,
            isShow
		}
	},
})
</script>
<style lang="scss" scoped>
.modal {
    .modal-body {
        min-height: 150px;
    }
}
</style>