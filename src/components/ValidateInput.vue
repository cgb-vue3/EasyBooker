<template>
	<div class="mb-4 validate-input">
		<span class="form-label p-2">{{ title }}</span>
		<input
			v-if = "tag === 'input'"
			type="text"
			class="form-control shadow-none"
			:class="{ 'is-invalid': ruleState.error }"
			aria-describedby="validationServer03Feedback"
			required
			@blur="onValidate"
			@input="updateValue"
			:value="inputRef"
			v-bind="$attrs"
		/>
		<textarea v-else
			class="form-control shadow-none"
			:class="{ 'is-invalid': ruleState.error }"
			aria-describedby="validationServer03Feedback"
			required
			rows="5"
			@blur="onValidate"
			@input="updateValue"
			:value="inputRef"
			v-bind="$attrs"
		/>
		<div class="invalid-feedback" v-if="ruleState.error">
			{{ ruleState.message }}
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, reactive, onMounted } from 'vue'
import { emitter } from './ValidateForm.vue'

interface RuleProp {
	type: 'required' | 'email' | 'password' | 'custom';
	message: string;
	validate? : () => any;
}

export type RulesProp = RuleProp[]

type TagProp = 'input' | 'textarea';

export default defineComponent({
	props: {
		title: {
			type: String,
			default: 'Input',
		},
		rules: {
			type: Array as PropType<RuleProp[]>,
			required: true,
		},
		modelValue: String,
		tag: {
			type: String,
			default: 'input'
		}
	},
	inheritAttrs: false,
	setup(props, ctx) {
		const mailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
		const inputRef = ref(props.modelValue || '')

		// Validate
		const ruleState = reactive({
			error: false,
			message: '',
		})


		let allPassed = false
		const onValidate = () => {
			props.rules.every((rule) => {
				switch(rule.type) {
					case 'required':
						allPassed = ! (inputRef.value.trim() == '')
						break;
					case 'email':
						allPassed = mailReg.test(inputRef.value)

						break;
					case 'password':
						allPassed = inputRef.value.length >= 6
						break;
					case 'custom':
						allPassed = rule.validate && rule.validate()
						break;	
				}

				ruleState.message = rule.message
				return allPassed
			})
			ruleState.error = !allPassed
			return allPassed
		}

		onMounted(() => {
			emitter.emit('item-created', onValidate)
		})

		// v-model
		const updateValue = (e: KeyboardEvent) => {
			inputRef.value = (e.target as HTMLInputElement).value
			ctx.emit('update:modelValue', inputRef.value)
		}
		return {
			inputRef,
			onValidate,
			ruleState,
			updateValue,
		}
	},
})
</script>
<style lang="scss" scoped>
.validate-input {
	.form-label {
		font-size: 14px;
		font-weight: 800;
		color: #333;
	}
	.form-control {
		font-size: 14px;
	}
}
</style>