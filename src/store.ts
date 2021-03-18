import { createStore } from "vuex";
import axios from 'axios'

import { UserProps, ColumnProps, PostProps } from "./hooks/typeProps";

export interface GlobalDataProps {
    loading: boolean;
    user: UserProps;
    column? : ColumnProps | {};
    columns: ColumnProps[];
    posts: PostProps[];
}

const store = createStore<GlobalDataProps>({
    state: {
        loading: false,
        user: {
            isLogin: true,
            name: 'DUING',
            id: 101,
            columnId: '5f3e86d62c56ee13bb830961c'
        },
        column: {},
        columns: [],
        posts: []
    },
    mutations: {
        logIn(state) {
            state.user.isLogin = true
        },
        logOut(state) {
            state.user.isLogin = false
        },
        createPost(state, payload) {
            state.posts.push(payload)
        },
        getColumns(state, payload) {
            state.columns = payload.list
        },
        getPosts(state, payload) {
            state.posts = payload.list
        },
        getColumn(state, payload) {
            state.column = payload
        },
        setLoading(state, status) {
            state.loading = status
        }
    },
    actions: {
        async getColumns(ctx) {
            const result = await axios.get('/columns')
            ctx.commit('getColumns', result)
        },
        async getColumn(ctx, columnId) {
            const result = await axios.get('/columns/' + columnId)
            ctx.commit('getColumn', result)
        },
        async getPosts(ctx, columnId) {
            const url  = `/columns/${columnId}/posts`
            const result = await axios.get(url, {
                params: {
                    currentPage: 1,
                    pageSize: 10
                }
            })
            ctx.commit('getPosts', result)
            return
        }
    },
})


export default store