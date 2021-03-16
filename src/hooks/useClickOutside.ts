import { ref, onMounted, onUnmounted } from 'vue'

const useClickOutside = (element: any) => {
    const isClickOutside = ref(false)

    const handleClick = (e: MouseEvent) => {
        if(!element.value.contains(e.target)) {
            isClickOutside.value = true
        } else {
            isClickOutside.value = false
        }
    }
    onMounted(() => {
        document.addEventListener('click', handleClick)

    })

    onUnmounted(() => {
        document.removeEventListener('click', handleClick)
    })

    return isClickOutside
}

export default useClickOutside