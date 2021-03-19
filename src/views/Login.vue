<template>
	<validate-form @form-submit="onFormSubmit">
		<validate-input
			title="邮箱"
			:rules="EmailRules"
			v-model="inputValue"
			placeholder="请输入邮箱。。。"
		>
		</validate-input>

		<validate-input
			title="密码"
			:rules="PasswordRules"
            v-model="passwordValue"
			type="password"
			placeholder="请输入密码。。。"
		></validate-input>

		<template v-slot:submit>
            登录
        </template>
	</validate-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { useStore } from 'vuex'
import { useRouter} from 'vue-router'
import createMessage from "../hooks/GlobalMessage";

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
        const inputValue = ref('')
		const passwordValue = ref('')
		const router = useRouter()
		const store = useStore()

		const onFormSubmit = (result: boolean) => {
			const user = {
				email: inputValue.value,
				password: passwordValue.value
			}
			
			if(result) {
				store.dispatch('logIn', user).then(res => {	
					createMessage('登录成功，2s后跳转首页。。。', 'success', 2000)
					setTimeout(() => {
						store.dispatch('getUser', store.state.token)
						router.push('/')
					}, 2000)
				}, e => {
					createMessage(store.state.error.message, 'error', 1000)
				})
			}
		}


		return {
			EmailRules,
			PasswordRules,
			inputValue,
            onFormSubmit,
            passwordValue
		}
	},
})
</script>