<template>
	<div class="d-flex justify-content-center py-4 flex-wrap">
		<div class="w-100 text-center mb-2">
			<svg t="1617160053480" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15417" width="64" height="64"><path d="M896 185.173333a52.906667 52.906667 0 0 0-46.08-9.813333L554.666667 251.306667v608.853333l322.56-82.773333A53.333333 53.333333 0 0 0 917.333333 725.333333V226.986667a53.333333 53.333333 0 0 0-21.333333-41.813334zM469.333333 251.306667L173.226667 175.36A54.186667 54.186667 0 0 0 128 185.173333a53.333333 53.333333 0 0 0-20.48 42.666667V725.333333a53.333333 53.333333 0 0 0 40.106667 51.626667L469.333333 860.16z" p-id="15418" fill="#37597d"></path></svg>
			<span class="fs-3 align-middle text-secondary mx-2">EBooker</span>
		</div>
		<div class="login">
			<validate-form @form-submit="onFormSubmit" class=" mb-4">
				<h3 class="py-3 text-center mt-4">请登录</h3>
				<validate-input
					title="邮箱"
					:rules="EmailRules"
					v-model="formData.email"
					placeholder="请输入邮箱"
				>
				</validate-input>

				<validate-input
					title="密码"
					:rules="PasswordRules"
					v-model="formData.password"
					type="password"
					placeholder="请输入密码"
				></validate-input>

				<template v-slot:submit> 登录 </template>
			</validate-form>
			<router-link to="/register" class="link-primary mb-5 text-decoration-none"
				>还没有账户？去注册一个新的吧！</router-link
			>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import createMessage from '../hooks/GlobalMessage'

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
		message: '请输入正确的密码！',
	},
]

export default defineComponent({
	name: 'Login',
	components: {
		ValidateInput,
		ValidateForm,
	},
	setup() {
		const formData = reactive({
			email: '',
			password: '',
		})
		const router = useRouter()
		const store = useStore()

		const onFormSubmit = (result: boolean) => {
			const user = {
				email: formData.email,
				password: formData.password,
			}

			if (result) {
				store.dispatch('logIn', user).then(
					(res) => {
						createMessage(
							'登录成功，2s后跳转首页。。。',
							'success',
							2000
						)
						setTimeout(() => {
							store.dispatch('getUser', store.state.token)
							router.push('/')
						}, 2000)
					},
					(e) => {
						createMessage(store.state.error.message, 'error', 1000)
					}
				)
			}
		}

		return {
			EmailRules,
			PasswordRules,
			onFormSubmit,
			formData,
		}
	},
})
</script>
<style lang="scss" scoped>
.login {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	width: 400px;
	box-shadow: 0 0 1px 0 #666;
	background-color: #fff;

	h3 {
		color: #5e6c84;
	}

	.validate-form {
		width: 266px;
	}
}
</style>