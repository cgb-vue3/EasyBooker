<template>
    <pre>
        {{ route }}
    </pre>
</template>
<script>
import { defineComponent } from "vue";
import {useRoute} from 'vue-router'

export default defineComponent({
    setup() {
        const route = useRoute()
        return {
            route
        }
    }
})
</script>