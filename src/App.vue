<template>
	<div class="bg-white border-bottom">
		<div class="container w-75">
			<GlobalHeader msg="Welcome to Your Vue.js + TypeScript App" />
		</div>
	</div>

	<div class="container bg-white w-75 mt-3 shadow-lg">
		<drop-down title="Duing">
			<drop-down-item> 编辑 </drop-down-item>
			<drop-down-item> 我的专栏 </drop-down-item>
			<drop-down-item> 退出 </drop-down-item>
		</drop-down>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from './components/GlobalHeader.vue'
import DropDown from './components/DropDown.vue'
import DropDownItem from './components/DropDownItem.vue'

export default defineComponent({
	name: 'App',
	components: {
		GlobalHeader,
		DropDown,
		DropDownItem,
	},
})
</script>

<style lang="scss">
#app {
	background-color: #f4f5f5;
	padding-bottom: 100px;
}
</style>
