<template>
	<div class="container w-75">
		<h2>新建文章</h2>
		<up-loading
			:beforeUpload="beforeUploadCheck"
			action="/upload/images"
			v-on="uploadEvent"
			class="uploading"
		>
			<template v-slot:beforeUpload="upLoadProps">
				<div class="uploading-item" @click="upLoadProps.handleClick">
					<h2>点击上传头图</h2>
				</div>
			</template>

			<template v-slot:upLoading>
				<div class="d-flex justify-content-center uploading-item">
					<div class="spinner-border" role="status"></div>
				</div>
			</template>

			<template v-slot:fileUploaded="upLoadedProps">
				<div @click="upLoadedProps.handleClick" class="uploading-item" :style="{background: `url(${avatar})`
				}">
					<h2 class="re-uploading">点击重新上传</h2>
				</div>
			</template>
		</up-loading>

		<validate-form @form-submit="onFormSubmit">
			<validate-input
				title="文章标题"
				:rules="TitleRules"
				v-model="formData.title"
				placeholder="请输入标题。。。"
			>
			</validate-input>

			<validate-input
				tag="textarea"
				title="新建文章"
				:rules="PostRules"
				v-model="formData.excerpt"
			></validate-input>

			<template v-slot:submit> 创建 </template>
		</validate-form>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import UpLoading from '../components/UpLoading.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import uploadCheck from '../hooks/useUploadCheck'
import createMessage from '../hooks/GlobalMessage'


const TitleRules: RulesProp = [
	{
		type: 'required',
		message: '标题不能为空',
	},
]
const PostRules: RulesProp = [
	{
		type: 'required',
		message: '内容不能为空',
	},
]

export default defineComponent({
	name: 'Login',
	components: {
		ValidateInput,
		ValidateForm,
		UpLoading,
	},
	setup() {

		const formData = reactive({
			title: '',
			excerpt: '',
		})
		const router = useRouter()
		const store = useStore()
		const beforeUploadProps = ref('')
		const columnId = store.state.user.columnId
		// 文件校验
		const beforeUploadCheck = (file: File) => {
			if (!uploadCheck(file)) {	
				createMessage(file.name + '是不支持的类型', 'error', 2000)
				return false
			}

			return true
		}

		const avatar = ref()
		// uploading 事件
		const uploadEvent = {
			uploading(data: any) {
				console.log('uploading', data)
			},
			fileUploaded(data: any) {
				console.log('fileUploaded', data)
				avatar.value = data.data.data.url
			},
			fileUploaderror(data: any) {
				console.log('fileUploaderror', data)
			},
		}

		const postData = computed(() => {
			const author = store.state.user._id

			return {
				image: '6055f50a9c7ab1263babb2c4',
				column: columnId,
				author: author,
				content: formData.excerpt,
				title: formData.title,
			}
		})

		const onFormSubmit = (result: boolean) => {
			console.log('submit:', postData)
			if (result) {
				store.dispatch('createPost', postData.value)
				// router.push('/columns/' + columnId)
			}
		}
		return {
			TitleRules,
			PostRules,
			formData,
			onFormSubmit,
			beforeUploadCheck,
			uploadEvent,
			beforeUploadProps,
			avatar
		}
	},
})
</script>
<style lang="scss" scoped>
.up-loading {
	.uploading-item {
		height: 200px;
		width: 100%;
		background-color: #dedede;
		color: #6c757d;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;


		.re-uploading {
			opacity: 0;
			width: 100%;
			text-align: center;
			height: 200px;
			line-height: 200px;

			&:hover {
				opacity: 1;
		}
		}
		
	}
}
</style>