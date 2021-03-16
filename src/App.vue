<template>
	<div class="bg-white border-bottom">
		<div class="container w-75">
			<GlobalHeader :user="User" />
		</div>
	</div>

	<div class="container bg-white w-75 mt-3 shadow-lg p-3">
		<column-list :ColumnList="Columns"></column-list>


		<validate-input title="邮箱" :rules="EmailRules"></validate-input>
		<validate-input title="密码" :rules="PasswordRules"></validate-input>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ColumnList from './components/ColumnList.vue'
import ValidateInput, { RuleProp } from './components/ValidateInput.vue'
import { Columns } from './hooks/testData'

const User: UserProps = {
	isLogin: true,
	name: 'DUING',
	id: 101,
}

const EmailRules: RuleProp[] = [
	{
		type: 'required',
		message: '邮箱不能为空！',
	},
	{
		type: 'email',
		message: '请输入正确的邮箱！'
	}
]
const PasswordRules: RuleProp[] = [
	{
		type: 'required',
		message: '密码不能为空！',
	},
	{
		type: 'password',
		message: '请输入正确的邮箱！'
	}
]

export default defineComponent({
	name: 'App',
	components: {
		GlobalHeader,
		ColumnList,
		ValidateInput,
	},
	setup() {
		return {
			Columns,
			User,
			EmailRules,
			PasswordRules
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
