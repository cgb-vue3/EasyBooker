<template>
	<div class="container w-75">
		<h2>新建文章</h2>
		<up-loading :beforeUpload="beforeUploadCheck" action="/upload/images"></up-loading>



		<validate-form @form-submit="onFormSubmit">
			<validate-input
				title="文章标题"
				:rules="TitleRules"
				v-model="title"
				placeholder="请输入标题。。。"
			>
			</validate-input>

			<validate-input
				tag="textarea"
				title="新建文章"
				:rules="PostRules"
				v-model="excerpt"
			></validate-input>

			<template v-slot:submit> 创建 </template>
		</validate-form>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import UpLoading from "../components/UpLoading.vue";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

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
		UpLoading
	},
	setup() {
		const title = ref('')
		const excerpt = ref('')
		const router = useRouter()
		const store = useStore()

        const columnId = store.state.user.columnId

		const beforeUploadCheck = (file: File) => {
			if(!['image/png', 'image/jpg'].includes(file.type)) {
				return false
			}

			return true
		}

		const postData = computed(() => {
            const author = store.state.user.name

			return {
				createdAt: new Date(),
				image: {
					id: '5e912f4c7f24af242a382b8c',
					url:
						'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5e912f4c7f24af242a382b8c.png',
				},
				column: columnId,
				author: author,
				excerpt: excerpt,
				title: title,
				id: '5f3fade0c9875c2cd848a2cb',
			}
        })
        
		const onFormSubmit = (result: boolean) => {
			console.log('submit:', result)
			if (result) {
				store.commit('createPost', postData.value)
				router.push('/columns/' + columnId)
			}
		}
		return {
			TitleRules,
			PostRules,
			title,
			onFormSubmit,
			excerpt,
			beforeUploadCheck
		}
	},
})
</script>