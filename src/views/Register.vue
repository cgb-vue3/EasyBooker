<template>
	<div class="d-flex justify-content-center">
		<div class="register">
			<validate-form @form-submit="onFormSubmit" class="validate-form">
				<h3 class="py-4 text-center">注册账户</h3>
				<validate-input
					title="邮箱地址"
					:rules="EmailRules"
					v-model="formData.email"
					placeholder="请输入邮箱"
				>
				</validate-input>

				<validate-input
					title="昵称"
					:rules="NickNameRules"
					v-model="formData.nickName"
					placeholder="请输入昵称"
				>
				</validate-input>

				<validate-input
					title="密码"
					:rules="PasswordRules"
					v-model="formData.password"
					type="password"
					placeholder="请输入密码"
				></validate-input>

				<validate-input
					title="重复密码"
					:rules="customRules"
					v-model="formData.rePassword"
					type="password"
					placeholder="请再次输入密码"
				></validate-input>
				<div class="mb-4">
					<router-link to="/login" class="link-primary fs-6"
						>已经有账户了？去登录</router-link
					>
				</div>
				<template v-slot:submit> 注册 </template>
			</validate-form>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import axios from 'axios'
import createMessage from '../hooks/GlobalMessage'
import { useRouter } from 'vue-router'

const EmailRules: RulesProp = [
	{
		type: 'required',
		message: '邮箱不能为空！',
	},
	{
		type: 'email',
		message: '请输入正确的邮箱！',
	},
]
const PasswordRules: RulesProp = [
	{
		type: 'required',
		message: '密码不能为空！',
	},
	{
		type: 'password',
		message: '密码的长度不能少于6位！',
	},
]

const NickNameRules: RulesProp = [
	{
		type: 'required',
		message: '昵称不能为空！',
	},
]

export default defineComponent({
	name: 'Register',
	components: {
		ValidateInput,
		ValidateForm,
	},
	setup() {
		const router = useRouter()
		const formData = reactive({
			email: '',
			nickName: '',
			password: '',
			rePassword: '',
		})

		const onFormSubmit = (result: boolean) => {
			if (result) {
				console.log(formData)
				axios({
					method: 'post',
					baseURL: 'http://127.0.0.1:3000/api/',
					url: '/users',
					data: {
						email: formData.email,
						nickName: formData.nickName,
						password: formData.password,
					},
				}).then((res: any) => {
					console.log(res)
					if (res.code == 400) {
						createMessage(res.error, 'error', 1000)
					}

					if (res.code == 500) {
						createMessage(
							'注册成功，1s后跳转登录页面。。。',
							'success',
							1000
						)
						setTimeout(() => {
							router.push('/login')
						}, 1000)
					}
				})
			}
		}

		const customRules: RulesProp = [
			{
				type: 'required',
				message: '请重复输入的密码！',
			},
			{
				type: 'custom',
				message: '请重复输入的密码！',
				validate: () => {
					return formData.password == formData.rePassword
				},
			},
		]

		return {
			NickNameRules,
			EmailRules,
			PasswordRules,
			customRules,
			onFormSubmit,
			formData,
		}
	},
})
</script>
<style lang="scss" scoped>
.register {
	display: flex;
	justify-content: center;
	min-height: 500px;
	width: 400px;

	h3 {
		color: #5e6c84;
	}

	.validate-form {
		width: 266px;
	}
}
</style>