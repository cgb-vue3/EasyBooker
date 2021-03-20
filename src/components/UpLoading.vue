<template>
	<div class="up-loading py-4">
		<div v-if="uploadStatus == 'beforeUpload'">
			<slot name="beforeUpload" v-bind:handleClick="handleClick">
				<button
					type="button"
					class="btn btn-outline-primary shadow-none"
					@click="handleClick"
				>
					点击上传
				</button>
			</slot>
		</div>
		<div v-else-if="uploadStatus == 'upLoading'">
			<slot name="upLoading">
				<div
					class="spinner-border text-primary mx-3"
					role="status"
				></div>
				<span>正在上传中...</span>
			</slot>
		</div>
		<a v-else-if="uploadStatus == 'fileUploaded'" @click="handleClick">
			<slot name="fileUploaded">
				<img :src="avatar" alt="" class="avatar" />
			</slot>
		</a>

		<input
			type="file"
			class="d-none"
			ref="fileInput"
			@change="fileChange"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'

type UploadingStatus = 'beforeUpload' | 'upLoading' | 'fileUploaded'
const instance = axios.create({
	baseURL: 'https://mallapi.duyiedu.com/',
	timeout: 5000,
})

export default defineComponent({
	props: {
		action: {
			type: String,
			required: true,
		},
		beforeUpload: {
			type: Function,
			required: true,
		},
	},
	emits: ['uploading', 'fileUploaded', 'fileUploaderror'],
	setup(props, ctx) {
		const fileInput = ref()
		const uploadStatus = ref<UploadingStatus>('beforeUpload')
		const avatar = ref('')
		const handleClick = () => {
			fileInput.value.click()
		}

		const fileChange = (e: Event) => {
			const files = (e.target as HTMLInputElement).files

			if (files) {
				const fileName = files[0]
				const fileStatus = props.beforeUpload(fileName)
				if (!fileStatus) {
					console.log(fileName.name + '是不支持的类型。')
					return
				}

				const formData = new FormData()
				formData.append('avatar', fileName)

				instance
					.post(props.action, formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
						params: {
							appkey: 'span_1604795537548',
						},
						onUploadProgress: function (progressEvent) {
							uploadStatus.value = 'upLoading'
							ctx.emit('uploading', progressEvent)
						},
					})
					.then(
						(res) => {
							uploadStatus.value = 'fileUploaded'
							avatar.value = res.data.data.url
							ctx.emit('fileUploaded', res)
						},
						(err) => {
							console.log('上传失败' + err)
							ctx.emit('fileUploaderror', err)
						}
					)
			}
		}

		return {
			handleClick,
			fileInput,
			fileChange,
			uploadStatus,
			avatar,
		}
	},
})
</script>
<style lang="scss" scoped>
.up-loading {
	.avatar {
		height: 50px;
		width: 100%;
		object-fit: cover;

		&:hover {
			cursor: pointer;
			box-shadow: 0 0 1px 0 #333;
		}
	}
}
</style>