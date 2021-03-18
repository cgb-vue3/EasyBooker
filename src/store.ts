import { createStore } from "vuex";
import axios from 'axios'

import { UserProps, ColumnProps, PostProps } from "./hooks/typeProps";

export interface GlobalDataProps {
    token: string;
    loading: boolean;
    user: UserProps;
    column? : ColumnProps | {};
    columns: ColumnProps[];
    posts: PostProps[];
}

const store = createStore<GlobalDataProps>({
    state: {
        token: '',
        loading: false,
        user: {
            isLogin: false,
            name: 'DUING',
            id: 101,
            columnId: '5f3e86d62c56ee13bb830961c'
        },
        column: {},
        columns: [],
        posts: []
    },
    mutations: {
        setUser(state, user) {
            state.user = {
                isLogin: true,
                ...user,
                columnId: user.column,
            }
        },
        logIn(state, token) {
            state.token = token
            
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
            ctx.commit('getColumns', result.data)
        },
        async getColumn(ctx, columnId) {
            const result = await axios.get('/columns/' + columnId)
            ctx.commit('getColumn', result.data)
        },
        async getPosts(ctx, columnId) {
            const url  = `/columns/${columnId}/posts`
            const result = await axios.get(url, {
                params: {
                    currentPage: 1,
                    pageSize: 10
                }
            })
            ctx.commit('getPosts', result.data)
        },
        async logIn(ctx, user) {
            // 获取token
            const result: any = await axios.post('/user/login', user)
            const token = result.data.token
            if(result.code === '404') {
                console.log(result.error)
            } else {
                ctx.commit('logIn', token)
            }
            ctx.dispatch('getUser', token)
        },
        async getUser(ctx, token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const userMessage = await axios.get('/user/current')

            if(userMessage.status !== 401) {
                ctx.commit('setUser', userMessage.data)
            }
        }

    },
})

export default store