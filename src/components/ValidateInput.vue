<template>
	<div>
		<span class="form-label">{{ title }}</span>
		<input
			type="text"
			class="form-control shadow-none"
			:class="{ 'is-invalid': ruleState.error }"
			aria-describedby="validationServer03Feedback"
			required
			@blur="onValidate"
            v-model="inputRef"
		/>
		<div class="invalid-feedback" v-if="ruleState.error">
			{{ ruleState.message }}
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, reactive } from 'vue'

export interface RuleProp {
	type: 'required' | 'email' | 'password';
    message: string;
}

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
	},
	setup(props) {
        const mailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

		const ruleState = reactive({
			error: false,
			message: '',
		})

        const inputRef = ref('')
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

		return {
            inputRef,
			onValidate,
            ruleState,
		}
	},
})
</script>