import { createStore } from "vuex";

import { UserProps, ColumnProps, PostProps, Posts, Columns } from "./hooks/testData";

export interface GlobalDataProps {
    user: UserProps;
    columns: ColumnProps[];
    posts: PostProps[];
}

const store = createStore<GlobalDataProps>({
    state: {
        user: {
            isLogin: true,
            name: 'DUING',
            id: 101,
            columnId: '5f3e86d62c56ee13bb830961c'
        },
        columns: Columns,
        posts: Posts
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
        }
    }
})


export default store