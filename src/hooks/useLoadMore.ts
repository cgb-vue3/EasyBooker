import store from "../store";
import { computed, ref } from 'vue'

function useLoadMore(actionName: any, params: any) {
    const currentPage = ref(params.currentPage)
    let total = 1000
    const isLastPage = computed(() => {
        return params.pageSize * currentPage.value <= total
    })

    const loadMorePage = () => {
        currentPage.value += 1
        store.dispatch(actionName, {
            currentPage: 1,
            pageSize: params.pageSize * currentPage.value
        }).then(res => {
            total = res.count
        })
    }


    return {
        loadMorePage,
        isLastPage
    }
}

export default useLoadMore