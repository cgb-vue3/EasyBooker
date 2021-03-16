<template>
	<div class="bg-white border-bottom">
		<div class="container w-75">
			<GlobalHeader :user="User" />
		</div>
	</div>

	<div class="container bg-white w-75 mt-3 shadow-lg p-3">
		<column-list :ColumnList="Columns"></column-list>

		<validate-form @form-submit="onFormSubmit">
			<validate-input
				title="邮箱"
				:rules="EmailRules"
				v-model="inputValue"
				placeholder="kjskfk"
			>
			</validate-input>

			<validate-input
				title="密码"
				:rules="PasswordRules"
				type="password"
				placeholder="请输入密码。。。"
			></validate-input>
		</validate-form>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ColumnList from './components/ColumnList.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
import { Columns } from './hooks/testData'

const User: UserProps = {
	isLogin: true,
	name: 'DUING',
	id: 101,
}

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
		message: '请输入正确的邮箱！',
	},
]

export default defineComponent({
	name: 'App',
	components: {
		GlobalHeader,
		ColumnList,
		ValidateInput,
		ValidateForm,
	},
	setup() {
		const inputValue = ref('test...')
		const onFormSubmit = (result: boolean) => {
			console.log('submit:', result)
		}
		return {
			Columns,
			User,
			EmailRules,
			PasswordRules,
			inputValue,
			onFormSubmit
		}
	},
})
</script>

<style lang="scss">
#app {
	background-color: #f4f5f5;
	padding-bottom: 100px;
}
</style>
