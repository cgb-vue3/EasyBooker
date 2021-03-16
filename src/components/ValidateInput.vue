<template>
	<div class="mb-3">
		<span class="form-label">{{ title }}</span>
		<input
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
		<div class="invalid-feedback" v-if="ruleState.error">
			{{ ruleState.message }}
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, reactive, onMounted } from 'vue'
import {emitter} from './ValidateForm.vue'

interface RuleProp {
	type: 'required' | 'email' | 'password';
    message: string;
}

export type RulesProp = RuleProp[]

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
        modelValue: String
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
			allPassed = props.rules.every((rule) => {
				if(rule.type === 'required' || rule.type === 'password') {
                    if ( !(inputRef.value.trim() == '')) {
                        return true
                    }
                } else if (rule.type === 'email') {
                    if (mailReg.test(inputRef.value)) {
						return true
					}
                } 
                
                ruleState.message = rule.message
                return false
            })
            ruleState.error = !allPassed
            return allPassed
		}

		onMounted(()=> {
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
            updateValue
		}
	},
})
</script>