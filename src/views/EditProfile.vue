<template>
	<div class="container bg-white w-75 mt-4 shadow-lg p-4 main">
		<div>
			<ul class="nav nav-tabs" @click="handleTab">
				<li class="nav-item">
					<a
						class="nav-link"
						aria-current="page"
						href="#"
						profile="user"
						:class="{ active: tabRef == 'user' }"
						>编辑个人资料</a
					>
				</li>
				<li class="nav-item">
					<a
						class="nav-link"
						href="#"
						profile="column"
						:class="{ active: tabRef == 'column' }"
						>更新专栏信息</a
					>
				</li>
			</ul>

			<div class="d-flex justify-content-center">
				<up-loading
					:beforeUpload="beforeUploadCheck"
					action="/upload"
					v-on="uploadEvent"
					class="uploading"
					status="fileUploaded"
				>
					<template v-slot:beforeUpload="upLoadProps">
						<div
							class="uploading-item upload-image"
							@click="upLoadProps.handleClick"
						>
							<h2>点击上传头图</h2>
						</div>
					</template>

					<template v-slot:upLoading>
						<div
							class="d-flex justify-content-center uploading-item"
						>
							<div class="spinner-border" role="status"></div>
						</div>
					</template>

					<template v-slot:fileUploaded="upLoadedProps">
						<div
							@click="upLoadedProps.handleClick"
							class="uploading-item"
							:style="{
								background: `url(${
									tabRef == 'user'
										? userData.avatar.url
										: columnData.avatar.url
								})`,
							}"
						>
							<h2 class="re-uploading">点击重新上传</h2>
						</div>
					</template>
				</up-loading>
			</div>
			<validate-form @form-submit="onFormSubmit" v-if="tabRef == 'user'">
				<validate-input
					title="文章标题"
					:rules="TitleRules"
					v-model="userData.title"
					placeholder="请输入标题。。。"
				>
				</validate-input>

				<validate-input
					tag="textarea"
					title="Description"
					:rules="PostRules"
					v-model="userData.excerpt"
				></validate-input>

				<template v-slot:submit> 更新 </template>
			</validate-form>
			<validate-form @form-submit="onFormSubmit" v-else>
				<validate-input
					title="文章标题"
					:rules="TitleRules"
					v-model="columnData.title"
					placeholder="请输入标题。。。"
				>
				</validate-input>

				<validate-input
					tag="textarea"
					title="Description"
					:rules="PostRules"
					v-model="columnData.excerpt"
				></validate-input>

				<template v-slot:submit> 更新 </template>
			</validate-form>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
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
		const router = useRouter()
		const store = useStore()
		const beforeUploadProps = ref('')
		const uploadedImg = ref()
		const tabRef = ref('user')

		const userData = reactive({
			title: store.state.user.nickName,
			excerpt: store.state.user.description,
			avatar: store.state.user.avatar || {},
			_id: store.state.user._id,
		})

		const columnData = reactive({
			title: store.state.column.title,
			excerpt: store.state.column.description,
			avatar: store.state.column.avatar || {},
			_id: store.state.column._id,
		})

		// 文件校验
		const beforeUploadCheck = (file: File) => {
			if (!uploadCheck(file)) {
				createMessage(file.name + '是不支持的类型', 'error', 2000)
				return false
			}
			return true
		}

		// uploading 事件
		const uploadEvent = {
			uploading(data: any) {
				console.log('uploading', data)
			},
			fileUploaded(data: any) {
				console.log('fileUploaded', data)
				uploadedImg.value = data.data.url
				userData.avatar._id = data.data._id
				columnData.avatar._id = data.data._id
			},
			fileUploaderror(data: any) {
				console.log('fileUploaderror', data)
			},
		}

		const onFormSubmit = (result: boolean) => {
			if (tabRef.value == 'user') {
				const users = {
					nickName: userData.title,
					description: userData.excerpt,
					avatar: userData.avatar._id,
					_id: userData._id,
				}
				store.dispatch('updateUser', users).then(() => {
					createMessage('更新成功，1S后回到首页', 'success', 1000)
					setTimeout(() => {
						router.push('/')
					}, 1000)
				})
			}
			if (tabRef.value == 'column') {
				const users = {
					title: columnData.title,
					description: columnData.excerpt,
					avatar: columnData.avatar._id,
					_id: columnData._id,
				}
				store.dispatch('updateColumn', users).then(() => {
					createMessage('更新成功，1S后回到首页', 'success', 1000)
					setTimeout(() => {
						router.push('/')
					}, 1000)
				})
			}
		}
		// 切换Tab
		const handleTab = (e: any) => {
			tabRef.value = e.target.getAttribute('profile')
		}

		return {
			TitleRules,
			PostRules,
			userData,
			columnData,
			onFormSubmit,
			beforeUploadCheck,
			uploadEvent,
			beforeUploadProps,
			uploadedImg,
			handleTab,
			tabRef,
		}
	},
})
</script>
<style lang="scss" scoped>
.up-loading {
	.uploading-item {
		height: 200px;
		width: 200px;
		background-color: #dedede;
		color: #6c757d;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		border-radius: 50%;

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