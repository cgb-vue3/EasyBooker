import { createStore } from "vuex";
import axios from 'axios'
import { UserProps, ColumnProps, PostProps } from "./hooks/typeProps";

export interface MessageProps {
    type: 'success' | 'error' | 'tips';
    message: string;
    status: boolean;
}


export interface GlobalDataProps {
    error: MessageProps;
    token: string | null;
    loading: boolean;
    user: UserProps;
    column?: ColumnProps | {};
    columns: ColumnProps[];
    posts: PostProps[];
    post: object;
}

const store = createStore<GlobalDataProps>({
    state: {
        error: {
            status: false,
            message: '提示信息',
            type: 'error'
        },
        token: localStorage.getItem('token'),
        loading: false,
        user: {
            isLogin: false,
        },
        column: {},
        columns: [],
        posts: [],
        post: {},
    },
    mutations: {
        setUser(state, user) {
            state.user = {
                isLogin: true,
                ...user,
                columnId: user.column,
            }
        },
        removeUser(state) {
            state.user.isLogin = false
            localStorage.removeItem('token')
        },
        logIn(state, token) {
            state.token = token
            localStorage.setItem("token", token)
        },
        logOut(state) {
            state.user.isLogin = false
            localStorage.removeItem('token')
        },
        getColumns(state, payload) {
            state.columns = payload.list
            localStorage.setItem('columns', JSON.stringify(state.columns))
        },
        getPosts(state, payload) {
            state.posts = payload.list
        },
        getPostById(state, post) {
            state.post = post
        },
        getColumn(state, payload) {
            state.column = payload
        },
        setLoading(state, status) {
            state.loading = status
        },
        setMessage(state, message) {
            state.error = message
        }
    },
    actions: {
        async getColumns(ctx, params) {
            const result = await axios.get('/columns', {
                params
            })
            ctx.commit('getColumns', result.data)
            return result.data
        },
        async getColumn(ctx, columnId) {
            const result = await axios.get('/columns/' + columnId)
            ctx.commit('getColumn', result.data)
        },
        async getPosts(ctx, payload) {
            ctx.state.posts.find(ele => ele.column === payload.columnId)
            
                const url = `/columns/${payload.columnId}/posts`
                const result = await axios.get(url, {
                    params: {
                        currentPage: payload.currentPage,
                        pageSize: payload.pageSize,
                    }
                })
                ctx.commit('getPosts', result.data)

                return result.data

        },
        async getPostById(ctx, postId) {
            const url = `/posts/${postId}`
            const result = await axios.get(url)
            ctx.commit('getPostById', result.data)
        },
        async logIn(ctx, user) {
            // 获取token
            const result: any = await axios.post('/user/login', user)
            if (result.msg !== '请求成功') {
                return Promise.reject('error')
            } else {
                const token = result.data.token
                ctx.commit('logIn', token)
                return Promise.resolve('success')
            }
        },
        async getUser(ctx, token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const userMessage: any = await axios.get('/user/current')
            if (userMessage.msg === "请求成功") {
                ctx.commit('setUser', userMessage.data)
                console.log('user', store.state.user, userMessage.data)
            } else {
                console.log('token 错误或过期！')
                ctx.commit('removeUser')
            }
        },
        async createPost(ctx, posts) {
            const post: any = await axios.post('/posts', posts)
            if (post.msg === "请求成功") {
                return Promise.resolve('success')
            } else {
                console.log('文章创建失败！')
                return Promise.reject('error')
            }
        },
        async updatePost(ctx, posts) {
            const post: any = await axios.patch('/posts/' + posts.postId, posts)
            if (post.msg === "请求成功") {
                return Promise.resolve('success')
            } else {
                console.log('文章更新失败！')
                return Promise.reject('error')
            }
        },
        async deletePost(ctx, postId) {
            const post: any = await axios.delete('/posts/' + postId)
            if (post.msg === "请求成功") {
                return Promise.resolve('success')
            } else {
                console.log('文章删除失败！')
                return Promise.reject('error')
            }
        },
        async updateUser(ctx, users) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${ctx.state.token}`
            const user: any = await axios.patch('/user/' + users._id, users)
            if (user.msg === "请求成功") {
                ctx.dispatch('getUser', ctx.state.token)
                return Promise.resolve('success')
            } else {
                console.log('用户信息更新失败！')
                return Promise.reject('error')
            }
        },
        async updateColumn(ctx, columns) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${ctx.state.token}`
            const user: any = await axios.patch('/columns/' + columns._id, columns)
            if (user.msg === "请求成功") {
                return Promise.resolve('success')
            } else {
                console.log('专栏信息更新失败！')
                return Promise.reject('error')
            }
        },
    },
    getters: {
        getColumnById: (state) => (columnId: any) => {
            const columnsStr = localStorage.getItem('columns')
            if (columnsStr) {
                const column = JSON.parse(columnsStr)
                return column.find( (ele: any) => ele._id === columnId)
            }
        },
    }
})

export default store